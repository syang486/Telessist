import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Agent } from '../models/agent';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http: HttpClient, private router: Router) { }

  login(data: any, user: any): Observable<any> {

    let loginEndpoint: string;

    switch (user.usertype) {
      case 'admin':
        loginEndpoint = 'http://localhost:8001/api/Admins/admin_login';
        console.log('admin');
        break;

      case 'client':
        loginEndpoint = 'http://localhost:8001/api/AuthUsers/login';
        console.log('client');
        break;

      case 'agent':
        loginEndpoint = 'http://localhost:8001/api/CSRAgents/login';
        console.log('agent');
        break;

      default:
        loginEndpoint = 'http://localhost:8001/AuthUsers/api/login';
        console.error('Invalid user!', user.usertype);
    }

    return this.http.post<any>(loginEndpoint, data, {
      headers: new HttpHeaders({"Content-Type":"application/json"})
    })
  }

  getClientIdByUserName(username: any):Observable<any> {
    return this.http.get<Client>('http://localhost:8056/api/Client/viewClientByUsername/' + username);
  }

  getAgentIdByUserName(username: any):Observable<any> {
    return this.http.get<Agent>('http://localhost:8039/api/Agent/viewAgentByUsername/' + username);
  }
  
}