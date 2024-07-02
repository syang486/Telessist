import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AdminCreateTechnicianComponent } from '../admin-create-technician/admin-create-technician.component';
import { Technician } from '../model/technician';
import { techRequest } from '../model/techRequest';
import { TechrequestService } from '../techrequest.service';
import { TechnicianService } from '../technician.service';
import { ngxCsv } from 'ngx-csv';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tech-request-admin',
  templateUrl: './tech-request-admin.component.html',
  styleUrls: ['./tech-request-admin.component.css']
})
export class TechRequestAdminComponent {
  techRequest: techRequest;
  techRequests : Array<techRequest> = [];
  techRequestTable : Array<techRequest> = [];
  message: string = "";
  status: string = "";
  displayedColumns: string[] = [];
  searchText: string = "";
  technicians : Array<Technician> = [];
  dataSource = new MatTableDataSource(this.techRequestTable)
  selected:string = "";
  data:any;

  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  obs!:Observable<any>

  constructor(private tService: TechrequestService, private dialog: MatDialog, private datePipe: DatePipe, private technicianService: TechnicianService){
    this.techRequest = new techRequest();
  }
  ngOnInit(): void {
    this.getAllTechRequests();
    this.displayedColumns = [ "clientId", "requestedDate", "status", "scheduledDate", "description", "technician"]
    this.selected = "None";
  }

  getAllTechRequests() {
    this.tService.viewAllTechRequests().subscribe(
      res => {
        if ( this.selected === "None"){
          this.techRequestTable = res;
        } else {
          this.techRequests = res.filter((t:any) => t.techRequestStatus.toUpperCase() === this.selected.toUpperCase());
          this.techRequestTable = this.techRequests;
        }
        this.data = this.techRequestTable;

        this.dataSource = new MatTableDataSource(this.techRequestTable);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      }, err => {
        this.message = err;
        console.log(err);
      }
    )
  }

  sortByStatus(){
    this.getAllTechRequests();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllTechnicians(techRequest: techRequest){
    this.dialog.open(AdminCreateTechnicianComponent, {
      width: '80%',
      height: '80%',
      data: {techDetails: techRequest}
    }).afterClosed().subscribe( res => { this.getAllTechRequests(); } )
  }

    createTechnician(){
      this.dialog.open(AdminCreateTechnicianComponent, {
        width: '80%',
        height: '80%'
      })
      console.log(this.technicianService.getTechnicians());
    }

    exportCsv() {
      this.data.forEach((d:any) => {
        if(d.technician == null) {
          d.technician = "unassigned";
        } else {
          d.technician = `${d.technicianId}: ${d.technician.techFirstName}: ${d.techLastName} : ${d.techAddress}`;
        }
      })
      let options = {
        title: "techRequestLog",
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: false,
        noDownload: false,
        showTitle: false,
        useBom: false,
        headers:['techRequestId', 'csrId','clientId', 'dateOfTechRequest', 'techRequestDesc', 'techScheduledDate', 'technician', 'techRequestStatus']
      }
      new ngxCsv(this.data, "Tech request report", options);
    }

    date(date: any){
      return this.datePipe.transform(date, "MM/dd/yyyy, hh:mm a");
    }
  
    date2(date: any){
      return this.datePipe.transform(date, "MM/dd/yyyy");
    }
}
