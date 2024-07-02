import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CallLog } from '../model/callLog';
import { CallLogServiceService } from '../services/call-log-service.service';
import { ngxCsv } from 'ngx-csv';

@Component({
  selector: 'app-call-log-list-admin',
  templateUrl: './call-log-list-admin.component.html',
  styleUrls: ['./call-log-list-admin.component.css']
})
export class CallLogListAdminComponent implements OnInit{
  csrAgentId: any;
  filteredCallLogs: CallLog[] = [];
  displayedColumns: string[] = [];
  callLogTable!: MatTableDataSource<any>
  tempER: String = '';
  obs!:Observable<any>
  data: any;

  searchText:String = "";

  @ViewChild(MatPaginator)
  paginator !:MatPaginator;




  constructor(private clService: CallLogServiceService, private dialog: MatDialog){
    this.filteredCallLogs = [];
  }


  ngOnInit(): void {
    this.loadAgentCallLogs();
    this.displayedColumns = ['CsrId', 'CallDate', 'CallTime', 'CallType', 'CallDesc', 'CallSolution'];
    this.tempER = 'None';
  }


  loadAgentCallLogs(){
    this.clService.fetchCallLogs().subscribe({
      next:(res:any) => {
        console.log(res)
        if(this.tempER === "None"){
          this.filteredCallLogs = res.filter((cl:any)=> cl.callType === 'Outgoing' || cl.callType === "Incoming");
        }
        else{
          this.filteredCallLogs = res.filter((cl:any)=> cl.callType === this.tempER);
        }
        this.data = this.filteredCallLogs;

        this.callLogTable = new MatTableDataSource<any>(this.filteredCallLogs)
        this.callLogTable.paginator = this.paginator
      }, 
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  filteredType(){
    this.loadAgentCallLogs();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.callLogTable.filter = filterValue.trim().toLowerCase();
  }

  exportCsv() {
    let options = {
      title: "callLog",
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers:['CallLogId', 'CsrId', 'ClientId', 'RequestId', 'CallDate', 'CallTime', 'CallType', 'CallDesc', 'CallSolution']
    }
    new ngxCsv(this.data, "call log report", options);
  }
}
