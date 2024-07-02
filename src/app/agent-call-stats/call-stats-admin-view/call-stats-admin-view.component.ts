import { Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { CallLog } from '../model/calllog';
import { CallStatsServiceService } from '../services/call-stats-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {DateAdapter} from '@angular/material/core';
import { MatDateRangeSelectionStrategy, DateRange, MAT_DATE_RANGE_SELECTION_STRATEGY, MatDateRangePicker} from '@angular/material/datepicker';
import { Agent } from '../model/agent';
import { Feedback } from '../model/feedback';
import { DecimalPipe } from '@angular/common';

export interface agentstats{
  week:string;
  agentId:string;
  agentName:string;
  incomingcall:number;
  outgoingcall: number;
  avgpercall:any;
  serviceadded:number;
  rating:any;
}

@Injectable()
export class SevenDayRangeSelectionStrategy implements MatDateRangeSelectionStrategy<string>{
  constructor(private _dateAdapter: DateAdapter<string>){}
  selectionFinished(date: string | null): DateRange<string> {
    return this._createSevenDayRange(date);
  }
  createPreview(activeDate: string | null): DateRange<string> {
    return this._createSevenDayRange(activeDate);
  }

  private _createSevenDayRange(date: string | null): DateRange<any>{
    if(date){
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day == 0? -6:1);
      const start = new Date(d.setDate(diff));
      const end = new Date(d.setDate(diff + 6));
      return new DateRange<any>(start, end);
    }
    return new DateRange<string>(null, null);
  }

}


@Component({
  selector: 'app-call-stats-admin-view',
  templateUrl: './call-stats-admin-view.component.html',
  styleUrls: ['./call-stats-admin-view.component.css'],
  providers:[
    {
      provide:MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: SevenDayRangeSelectionStrategy
    }
  ]
})


export class CallStatsAdminViewComponent implements OnInit{
  agentStatsList : agentstats[] = [];
  dataSource!:MatTableDataSource<any>;
  displayedStatsColumns:string[] = [];
  selected:string = '';
  startdateofWeek : Date;
  enddateofWeek :Date;
  agentList !: Agent[];
  feedbackList !: Feedback[];
  calllogList !: CallLog[];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  
  
  constructor(private cservice:CallStatsServiceService, private decimal: DecimalPipe){
    this.startdateofWeek = new Date((new Date()).setDate((new Date()).getDate() - (new Date()).getDay() -6));
    this.enddateofWeek = new Date((new Date).setDate((new Date()).getDate() - (new Date()).getDay()));
  }
 
  
  ngOnInit(): void {
    this.loadAgentStats();
    this.displayedStatsColumns = ['week', 'agentId', 'agentName', 'rating', 'avgcalltime', 'numcalltaken', 'numcallmade', 'serveadded']
    this.selected = "None";
    
  }

  loadAgentStats(){
    this.agentStatsList = [];
    this.cservice.getAllAgents().subscribe({
      next:(res:any)=>{
        this.agentList = res;
        for(let agent in this.agentList){
          this.cservice.getFeedbackByAgentId(this.agentList[agent].agentId).subscribe({
            next:(res:any)=>{
              this.feedbackList = res;
              this.feedbackList = this.feedbackList.filter(ele=>new Date(ele.feedbackDate).getTime() >= new Date(this.startdateofWeek).getTime() && new Date(ele.feedbackDate).getTime() <= new Date(this.enddateofWeek).getTime());
              this.cservice.getCallLogsByAgentId(this.agentList[agent].agentId).subscribe({
                next:(res:any)=>{
                  this.calllogList = res;
                  this.calllogList = this.calllogList.filter(ele=> new Date(ele.callDate).getTime() >= new Date(this.startdateofWeek).getTime() && new Date(ele.callDate).getTime() <= new Date(this.enddateofWeek).getTime())
                  
                  let weekseen = this.startdateofWeek.toLocaleDateString() + " - "+  this.enddateofWeek.toLocaleDateString();
                  let agentname = this.agentList[agent].firstName + " " + this.agentList[agent].lastName;
                  let incomecall = this.calllogList.filter(ele=>ele.callType==="Incoming").length;
                  let outgocall = this.calllogList.filter(ele=>ele.callType==="Outgoing").length;
                  let avg = this.decimal.transform(this.calllogList.reduce((total, next) => total + next.callTime, 0)/this.calllogList.length,  "1.2-2");
                  let serveadded = this.calllogList.filter(ele=>ele.callDesc === "Add Service").length;
                  let rate = this.decimal.transform(this.feedbackList.reduce((total, next)=> total + next.rating, 0)/this.feedbackList.length, "1.2-2");
                  var stats : agentstats = {
                                    week:weekseen,
                                    agentId:this.agentList[agent].agentId!,
                                    agentName:agentname!,
                                    incomingcall:incomecall!,
                                    outgoingcall: outgocall!,
                                    avgpercall:avg!,
                                    serviceadded:serveadded!,
                                    rating:rate!};
                  this.agentStatsList.push(stats);
                  this.dataSource = new MatTableDataSource(this.agentStatsList);
                  this.dataSource.paginator = this.paginator;
                },
                error:(err:any)=>{
                  console.log(err);
                }
              })
            },
            error:(err:any)=>{
              console.log(err);
            }
            
          })
        }
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
    
  }


  @Input() start !: Date;
  @Input() end !: Date;
  applyDateFilter(picker : MatDateRangePicker<any>){
    this.startdateofWeek = this.start;
    this.enddateofWeek = this.end;
    this.loadAgentStats();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  
}
