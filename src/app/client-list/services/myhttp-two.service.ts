import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Client } from '../model/client';
import { EquipRequest } from '../model/equiprequest';
import { ServiceRequest } from '../model/servicerequest';
import { TechRequest } from '../model/techrequest';

@Injectable({
  providedIn: 'root'
})
export class MyhttpTwoService {

  token:any;

  clients: Client[] = [];
  clientsGlobal: BehaviorSubject<Array<Client>>;

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem("mytoken");
    this.clientsGlobal = new BehaviorSubject<Array<Client>>([]);
  }

  fetchClients() {
    return this.http.get<Array<Client>>('http://localhost:8056/api/Client/viewAllClients').subscribe({
      next:(res:any) =>{
        this.clients = res;
        this.clientsGlobal.next(this.clients);
      },
      error:(err:any) =>{
        console.log(err);
      }
    })
  }

  getClients(): Observable<any> {
    return this.clientsGlobal;
  }

  deleteClient(id:any):Observable<any> {
    return this.http.delete('http://localhost:8056/api/Client/deleteClient/' +id).pipe(
      tap((res:any) => {
        let index = this.clients.findIndex(c => c.clientId === id);
        this.clients.splice(index, 1);
        this.clientsGlobal.next(this.clients);
        return this.clientsGlobal;
      })
    )
  }

  // updateClient(client: Client):Observable<any> {
  //   return this.http.delete('http://localhost:8056/api/Client/updateClient/' + client.clientId).pipe(
  //     tap((res:any) => {
  //       const existClient = this.clients.find(c => c.clientId === client.clientId);
  //       if(existClient) {
  //         Object.assign(existClient, client);
  //       }
  //       this.clientsGlobal.next(this.clients);
  //       return this.clientsGlobal;
  //     })
  //   )
  // }

  getServiceRequestsForClient(clientId: any) {
    return this.http.get<Array<ServiceRequest>>('http://localhost:9000/api/telessist/agent/viewServiceRequestsByClientId/' + clientId, {
      headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token)
    });
  }

  getEquipmentRequestsForClient(equipId: any) {
    return this.http.get<Array<EquipRequest>>('http://localhost:9099/api/telessist/agent/viewEquipmentRequestByEquipmentId/' + equipId, {
      headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token)
    });
  }

  getTechRequestsForClient(techId: any) {
    return this.http.get<Array<TechRequest>>('http://localhost:8085/api/telessist/agent/viewTechRequByClientId/' + techId, {
      headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token)
    });
  }
}
