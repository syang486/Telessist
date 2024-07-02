import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CallStatsServiceService } from 'src/app/agent-call-stats/services/call-stats-service.service';
import { MyrouterService } from 'src/app/services/myrouter.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent {
  callloglist:any;
  incomingcall:any;
  outgoingcall:any;
  callStat:any;
  dataPC:any;

  constructor(private cservice:CallStatsServiceService, private router: MyrouterService){
    this.callloglist = [];
    this.callStat=[];
    this.loadCallLogList();
  }

  loadCallLogList(){
    this.cservice.getAllCallLogs().subscribe({
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

  openMan(){ this.router.openCSRManagement() }
  openStat(){ this.router.openAdminCallStat() }
}
