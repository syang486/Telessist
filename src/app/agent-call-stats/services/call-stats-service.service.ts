import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CallLog } from '../model/calllog';
import { Agent } from '../model/agent';
import { Feedback } from '../model/feedback';

@Injectable({
  providedIn: 'root'
})
export class CallStatsServiceService {
  token:any;

  calllogList : CallLog[] = [];
  agentList : Agent[] = [];
  feedbackList: Feedback[] = [];



  constructor(private httpclientobj:HttpClient) {
   }

  getCallLogsByAgentId(agentId: any):Observable<any>{
    return this.httpclientobj.get<Array<CallLog>>('http://localhost:8187/CallLogs/callLogByCsrId/'+agentId);
  }

  getAllCallLogs():Observable<any> {
    return this.httpclientobj.get<Array<CallLog>>('http://localhost:8187/CallLogs');
  }

  getAllAgents():Observable<any>{
    return this.httpclientobj.get<Array<Agent>>('http://localhost:8039/api/Agent/viewAllAgents');
  }

  getFeedbackByAgentId(agentId: any):Observable<any> {
    return this.httpclientobj.get<Array<Feedback>>('http://localhost:8069/api/Feedback/viewFeedbackByAgentId/'+ agentId);
  }

}
