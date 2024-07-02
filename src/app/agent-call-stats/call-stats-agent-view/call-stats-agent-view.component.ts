import { Component, OnInit, ViewChild } from '@angular/core';
import { CallLog } from '../model/calllog';
import { CallStatsServiceService } from '../services/call-stats-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DecimalPipe } from '@angular/common';

export interface statssummary{
  incomingcall:number;
  outgoingcall: number;
  avgpercall:any;
  serviceadded:number;
}


@Component({
  selector: 'app-call-stats-agent-view',
  templateUrl: './call-stats-agent-view.component.html',
  styleUrls: ['./call-stats-agent-view.component.css']
})



export class CallStatsAgentViewComponent implements OnInit {
  agentId:any;
  dataSource!:MatTableDataSource<any>;
  displayedStatsColumns:string[] = [];
  displayedSummaryColumns:string[] = [];
  selected:string = '';
  callloglist!:CallLog[];
  statssummarylist!:statssummary[];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  startdate : FormControl; 
  enddate : FormControl; 
  firstdateofpreweek:Date;
  lastdateofpreweek:Date;


  constructor(private cservice:CallStatsServiceService, private decimal: DecimalPipe){
    this.agentId = sessionStorage.getItem("csrId");
    this.firstdateofpreweek = new Date((new Date()).setDate((new Date()).getDate() - (new Date()).getDay() -6));
    this.lastdateofpreweek = new Date((new Date()).setDate((new Date()).getDate() - (new Date()).getDay()));
    this.startdate = new FormControl(this.firstdateofpreweek, {validators: [Validators.required]});
    this.enddate = new FormControl(this.lastdateofpreweek, {validators: [Validators.required]});
  }

  ngOnInit(): void {
    this.loadCallLogList();
    this.displayedStatsColumns = ['callDate', 'callTime', 'callType', 'callDesc', 'callSolution']
    this.displayedSummaryColumns = ['number of incoming calls', 'number of outgoing calls', 'avg time per call', 'number of services added']
    this.selected = "None";
  }


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  })

  applyFilter() {
    this.startdate = new FormControl(this.range.controls['start'].value, {validators:[Validators.required]});
    this.enddate = new FormControl(this.range.controls['end'].value, {validators:[Validators.required]});
    this.loadCallLogList();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.loadStatsSummary();
  }

  loadCallLogList(){
    //this.agentId
    this.cservice.getCallLogsByAgentId(this.agentId).subscribe({
      next:(res:any)=>{

        if(this.selected === "None"){
          this.callloglist = res.filter((ele:any)=> ele.callType === "Outgoing" || ele.callType === "Incoming");
        }else{
          this.callloglist = res.filter((ele:any) => ele.callType === this.selected);
        }
        this.callloglist = this.callloglist.filter(ele=> new Date(ele.callDate).getTime() >= new Date(this.startdate.value).getTime() && new Date(ele.callDate).getTime() <= new Date(this.enddate.value).getTime());
        this.dataSource = new MatTableDataSource(this.callloglist);
        this.dataSource.paginator = this.paginator;

        this.loadStatsSummary();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  loadStatsSummary(){
    let incomecall = this.dataSource.data.filter(ele=>ele.callType === "Incoming" ).length;
    let outgocall = this.dataSource.data.filter(ele=>ele.callType === "Outgoing").length;
    let avg =  this.decimal.transform(this.dataSource.data.reduce((total, next) => total + next.callTime, 0)/this.dataSource.data.length, "1.2-2");
    let serveadded = this.dataSource.data.filter(ele=>ele.callDesc === "Add Service").length;
    this.statssummarylist = [{"incomingcall":incomecall, "outgoingcall": outgocall, "avgpercall":avg, "serviceadded":serveadded}]
  }


  handleStatus(){
    this.loadCallLogList();

  }
  

  
}
