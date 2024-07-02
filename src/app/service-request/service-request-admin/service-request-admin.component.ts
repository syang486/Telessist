import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ServiceRequest } from '../model/servicerequest';
import { ServiceDialogComponent } from '../service-dialog/service-dialog.component';
import { MyhttpService } from '../services/myhttp.service';
import { ngxCsv } from 'ngx-csv';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-service-request-admin',
  templateUrl: './service-request-admin.component.html',
  styleUrls: ['./service-request-admin.component.css']
})
export class ServiceRequestAdminComponent {
  dataTable!:MatTableDataSource<any>;
  displayedColumns: string[] = [];
  selected:string = "";
  // serviceRequests: ServiceRequest[] = [];
  requests:Array<any>;
  searchText:String = "";
  data:any;

  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  obs!:Observable<any>

  constructor(private http: MyhttpService, private dialog: MatDialog, private datePipe: DatePipe) {
    this.requests = [];
    this.http.fetchServiceRequests();
  }

  ngOnInit(): void {
    this.loadServiceRequests();
    this.displayedColumns = [ 'serviceId', 'clientId', 'csrId', 'dateOfServiceRequest', 'serviceRequestStatus'];
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
        this.data = this.requests;

        this.dataTable = new MatTableDataSource<any>(this.requests);
        this.dataTable.paginator = this.paginator;
        this.obs = this.dataTable.connect();
      },
      error:(err:any) => {
        console.log(err);
      }
    })
  }

  handleStatus() {
    this.loadServiceRequests();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }

  exportCsv() {
    let options = {
      title: "serviceRequestLog",
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers:['serviceRequestId', 'serviceId', 'csrId', 'clientId', 'dateOfServiceRequest', 'serviceRequestDesc', 'serviceRequestStatus']
    }
    new ngxCsv(this.data, "service request report", options);
  }
  date(date: any){
    return this.datePipe.transform(date, "MM/dd/yyyy, hh:mm a");
  }

}
