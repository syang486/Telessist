import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyrouterService {

  constructor(private routerobj: Router) {
  }

  openClientDashboard() {
    this.routerobj.navigate(['clientdash']);
  }

  openAdminDashboard() {
    this.routerobj.navigate(['admindash']);
  }

  openAgentDashboard() {
    this.routerobj.navigate(['agentdash']);
  }

  openLogin() {
    this.routerobj.navigate(['login']);
  }

  openCSRManagement() {
    this.routerobj.navigate(['admindash/manageagent'])
  }

  openAdminCallStat() {
    this.routerobj.navigate(['admindash/admincallstat'])
  }

  openAgentCallStat(){
    this.routerobj.navigate(['agentdash/agentcallstat'])
  }

  openClientRequest(){
    this.routerobj.navigate(['agentdash/agentclientrequests'])
  }
}
