import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
// import {LocalDateTime, DateTimeFormatter } from '@js-joda/core';
// import { CalllogDialogComponent } from '../call-dialog/calllog-dialog.component';
import { ServiceRequest } from '../model/servicerequest';
import { TodoserviceService } from '../todoservice.service';
// import { ServiceDialogComponent } from '../service-dialog/service-dialog.component';
// import { MyhttpService } from '../services/myhttp.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit{
  
  dataTable!:MatTableDataSource<any>;
  displayedColumns: string[] = [];
  selected:string = "";
  // serviceRequests: ServiceRequest[] = [];
  requests:Array<any>;
  filteredRequests:Array<any>;
  searchText:String = "";
  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  obs!:Observable<any>

  constructor(private http: TodoserviceService, private dialog: MatDialog) {
    this.requests = [];
    this.filteredRequests = [];
  }

  ngOnInit(): void {
    this.loadServiceRequests();
    this.displayedColumns = ['serviceId', 'clientId', 'dateOfServiceRequest', 'descriptionOfServiceRequest', 'serviceRequestStatus'];
    this.selected = "None";
  }

  loadServiceRequests() {
    this.http.getAllServiceRequest().subscribe(
      res => {
        if (this.selected === "None"){
          console.log(res);
          this.requests = res;
        } else {
          this.requests = res.filter((t:any) => t.serviceRequestStatus === this.selected);
        }
        const currentDate = new Date();
        const twoYears = 2 * 365 * 24 * 60 * 60 * 1000; // Two years in milliseconds
        const oneYearElevenMonthsTwoYearsAgo = new Date(currentDate.getTime() - twoYears + 31 * 24 * 60 * 60 * 1000); // 1 year and 11 months to 2 years ago
        const twoYearsAgo = new Date(currentDate.getTime() - twoYears);
        this.filteredRequests = this.requests.filter(request => {
          const requestDate = new Date(request.dateOfServiceRequest);
          console.log(requestDate);
          console.log("One: "+ oneYearElevenMonthsTwoYearsAgo);
          console.log(requestDate <= oneYearElevenMonthsTwoYearsAgo);
          return (requestDate <= oneYearElevenMonthsTwoYearsAgo && requestDate >= twoYearsAgo ); // && requestDate <= currentDate
        });
        this.dataTable = new MatTableDataSource(this.filteredRequests);
        this.dataTable.paginator = this.paginator;
        this.obs = this.dataTable.connect();
      }, err => {
        console.log(err);
      }
    )
  }

  handleStatus() {
    this.loadServiceRequests();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }
}
