import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Agent } from './agentModel';
import { AgentLoginModel } from './agent-login.model';

@Injectable({
  providedIn: 'root'
})
export class AgentmanageserviceService {

  agents: Agent[] = [];
  agentsGlobal: BehaviorSubject<Array<Agent>>;

  constructor(private http: HttpClient) {
    this.agentsGlobal = new BehaviorSubject<Array<Agent>>([]);
  }

  fetchAgents() {
    return this.http.get<Array<Agent>>("http://localhost:8039/api/Agent/viewAllAgents").subscribe({
      next:(res:any) => {
        this.agents = res;
        this.agentsGlobal?.next(this.agents);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  getAllAgents(): Observable<any> {
    return this.agentsGlobal;
  }

  getAgentByAgentId(agentId: any):Observable<any>{
    return this.http.get<Agent>('http://localhost:8039/api/Agent/viewAgent/'+agentId);
  }

  //POST (Adding the new agent)
  postAgent(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:8039/api/Agent/addAgent", data, {
      headers: new HttpHeaders({"Content-Type":"application/json"})
    }).pipe(
      tap((res:any) =>{
        this.agents.push(res);
        this.agentsGlobal.next(this.agents);
        return this.agentsGlobal;
      })
    )
  }

  //PUT (Updating the agent)
  updateAgent(data: any, id: any): Observable<any> {
    return this.http.put<any>("http://localhost:8039/api/Agent/updateAgent/" + id, data, {
      headers: new HttpHeaders({"Content-Type":"application/json"})
    }).pipe(
      tap((res:any) => {
        const existAgent= this.agents.find(a => a.agentId === id);
        if(existAgent) {
          Object.assign(existAgent, data);
        }
        this.agentsGlobal.next(this.agents);
        return this.agentsGlobal;
      })
    );
  }
  
  //DELETE (deleting agent)
  deleteAgent(id: any): Observable<any> {
    return this.http.delete<any>("http://localhost:8039/api/Agent/deleteAgent/" + id).pipe(
      tap((res:any) => {
        let index = this.agents.findIndex(a => a.agentId === id);
        this.agents.splice(index, 1);
        this.agentsGlobal.next(this.agents);
        return this.agentsGlobal;
      })
    );
  }

  // Post CSR to auth table 
  registerAgent(login: AgentLoginModel) {
    return this.http.post<AgentLoginModel>('http://localhost:8001/api/CSRAgents/register_agent', login, {
      headers: new HttpHeaders({"Content-Type":"application/json"})
    })
  }
}
