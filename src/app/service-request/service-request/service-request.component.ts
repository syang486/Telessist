import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CalllogDialogComponent } from '../call-dialog/calllog-dialog.component';
import { ServiceRequest } from '../model/servicerequest';
import { ServiceDialogComponent } from '../service-dialog/service-dialog.component';
import { MyhttpService } from '../services/myhttp.service';
import { SnackbarService } from '../services/snackbar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit{
  
  dataTable!:MatTableDataSource<any>;
  displayedColumns: string[] = [];
  selected:string = "";
  // serviceRequests: ServiceRequest[] = [];
  requests:Array<any>;
  searchText:String = "";
  message:string = "";

  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  obs!:Observable<any>

  constructor(private http: MyhttpService, private dialog: MatDialog, private snackBar: SnackbarService, private datePipe: DatePipe) {
    this.http.fetchServiceRequests();
    this.requests = [];
  }

  ngOnInit(): void {
    this.loadServiceRequests();
    this.displayedColumns = ['serviceId', 'clientId', 'dateOfServiceRequest', 'serviceRequestStatus', 'resolve', 'delete', 'callLog'];
    this.selected = "None";
  }

  loadServiceRequests() {
    this.http.getAllServiceRequest().subscribe({
      next:(res:any) =>{
        if(this.selected === "None") {
            this.requests = res.filter((s:any) => s.serviceRequestStatus === "Pending" || s.serviceRequestStatus === "Active" || s.serviceRequestStatus === "Inactive");
        } else {
          this.requests = res.filter((s:any) => s.serviceRequestStatus === this.selected);
        }
        this.dataTable = new MatTableDataSource<any>(this.requests);
        this.dataTable.paginator = this.paginator;
        this.obs = this.dataTable.connect();
      },
      error:(err:any) => {
        console.log(err);
      }
    })
  }

  updateRequest(serviceR: ServiceRequest) {
    this.dialog.open(ServiceDialogComponent, {
      width:'80%',
      height:'80%',
      data:{serviceDetails: serviceR}
    })
  }

  deleteRequest(id: any) {
    this.http.deleteServiceRequest(id).subscribe({
      next:(res:any)=>{
        this.message = "Service Request Succesfully Deleted";
        this.snackBar.validSnackBar(this.message, 'Close');
      },
      error:(err:any)=>{
        this.message = "Service Request Not Deleted"
        this.snackBar.invalidSnackBar(this.message, 'Try Again');
        console.log(err);
      }
    })
  }

  addCallLog(serviceR: ServiceRequest) {
    this.dialog.open(CalllogDialogComponent, {
      width:'80%',
      height:'80%',
      data:{serviceDetails: serviceR}
    })
  }

  handleStatus() {
    // if(this.selected === "None") {
    //   this.dataTable = this.serviceRequests;
    // } else{
    //   this.dataTable = this.serviceRequests.filter(s => s.serviceRequestStatus === this.selected);
    // }
    this.loadServiceRequests();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

  date(date: any){
    return this.datePipe.transform(date, "MM/dd/yyyy, hh:mm a");
  }
}
