import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client';
import { Feedback } from '../model/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackhttpService {

  constructor(private http: HttpClient) {
  }

  getFeedbackByAgentId(agentId: any):Observable<any> {
    return this.http.get<Array<Feedback>>('http://localhost:8069/api/Feedback/viewFeedbackByAgentId/'+ agentId);
  }

  getAllFeedback():Observable<any> {
    return this.http.get<Array<Feedback>>('http://localhost:8069/api/Feedback/viewAllFeedbacks');
  }

  getClientByClientId(id: any):Observable<any> {
    return this.http.get<Array<Client>>('http://localhost:8056/api/Client/viewClientById/' +id);
  }
}
