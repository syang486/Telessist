import { Component } from '@angular/core';
import { AgentmanageserviceService } from 'src/app/adminframeworkmodule/admin-agent-manage/agentmanageservice.service';
import { CallStatsServiceService } from 'src/app/agent-call-stats/services/call-stats-service.service';
import { MyrouterService } from 'src/app/services/myrouter.service';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent {
  callloglist:any;
  incomingcall:any;
  outgoingcall:any;
  callStat:any;
  dataPC:any;
  agentname:any;
  agentId:any;

  constructor(private cservice:CallStatsServiceService, private router: MyrouterService, private aservice:AgentmanageserviceService){
    this.callloglist = [];
    this.callStat=[];
    this.agentId = sessionStorage.getItem("csrId");
    this.loadAgentName();
    this.loadCallLogList();
    
  }

  loadAgentName(){
    this.aservice.getAgentByAgentId(this.agentId).subscribe({
      next:(res:any)=>{
        this.agentname = res.firstName + " " + res.lastName;
      }
    })
  }

  loadCallLogList(){
    this.cservice.getCallLogsByAgentId(this.agentId).subscribe({
      next:(res:any)=>{
        this.callloglist = res;
        this.incomingcall = this.callloglist.filter((ele:any)=>ele.callType === "Incoming" ).length;
        console.log(this.incomingcall)
        this.outgoingcall = this.callloglist.filter((ele:any)=>ele.callType === "Outgoing").length;
        
        let totalcall = this.incomingcall + this.outgoingcall;

        if(totalcall == 0) {
          this.incomingcall = 0;
          this.outgoingcall = 0;
        } else {
          this.incomingcall = this.incomingcall / totalcall * 100;
          this.outgoingcall = this.outgoingcall / totalcall * 100;
        }

        this.callStat.push({
          name:"Incoming",
          value: this.incomingcall 
        })
        this.callStat.push({
          name:"Outgoing",
          value: this.outgoingcall 
        })
        console.log(this.callStat)
        this.dataPC = this.callStat;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  
  // Options for Pie Chart
  viewPC: [number, number] = [500, 300];
  animationPC = true;
  colorSchemePC = "vivid";
  labelsPC = true;
  doughnut = true;

  percentageFormatterPC(data: any): string {
    return data.value + "%";
  }

  openRequest(){ this.router.openClientRequest() }
  openStat(){ this.router.openAgentCallStat() }
}
