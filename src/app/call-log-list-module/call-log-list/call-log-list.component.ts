import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CallLogListDialogComponent } from '../call-log-list-dialog/call-log-list-dialog.component';
import { CallLog } from '../model/callLog';
import { CallLogServiceService } from '../services/call-log-service.service';

@Component({
  selector: 'app-call-log-list',
  templateUrl: './call-log-list.component.html',
  styleUrls: ['./call-log-list.component.css']
})
export class CallLogListComponent implements OnInit{
 
  csrAgentId: any;
  filteredCallLogs: CallLog[] = [];
  displayedColumns: string[] = [];
  callLogTable!: MatTableDataSource<any>
  tempER: String = '';
  obs!:Observable<any>

  searchText:String = "";

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

  chartdata= [  
    {
      "name": "Vancouver",
      "value": 2500000
    },
    {
      "name": "Montreal",
      "value": 990000
    },
    {
      "name": "Toronto",
      "value": 560000
    }
  ];

  @ViewChild(MatPaginator)
  paginator !:MatPaginator;

  constructor(private clService: CallLogServiceService, private dialog: MatDialog){
    this.csrAgentId = sessionStorage.getItem('csrId');
    this.filteredCallLogs = [];
  }


  ngOnInit(): void {
    this.loadAgentCallLogs();
    this.displayedColumns = ['CallDate', 'CallTime', 'CallType', 'CallDesc', 'CallSolution', 'resolve', 'delete'];
    this.tempER = 'None';
  }

  loadAgentCallLogs(){
    this.clService.getCallLogForCsrId(this.csrAgentId).subscribe({
      next:(res:any) => {
        if(this.tempER === "None"){
          console.log(res);
          this.filteredCallLogs = res.filter((cl:any)=> cl.callType === 'Outgoing' || cl.callType === "Incoming");
                }
        else{
          this.filteredCallLogs = res.filter((cl:any)=> cl.callType === this.tempER);
          console.log(this.filteredCallLogs)
        }
        this.callLogTable = new MatTableDataSource<any>(this.filteredCallLogs)
        this.callLogTable.paginator = this.paginator
        console.log(this.callLogTable)
      }, 
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  filteredType(){
    this.loadAgentCallLogs();
  }

  deleteCallLog(id:any){
    this.clService.deleteCallLog(id).subscribe({
      next:(res:any)=>{
        console.log("Call Log Deleted")
      },
      error:(err:any)=>{
        console.log(err)
      }

    })
  }

  updatedCallLog(callLog: CallLog){
    this.dialog.open(CallLogListDialogComponent,{
      width:'80%',
      height:'80%',
      data:{callLogDetails: callLog}
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.callLogTable.filter = filterValue.trim().toLowerCase();
  }

}

export var single = [
  
];

export var multi = [
 
];
