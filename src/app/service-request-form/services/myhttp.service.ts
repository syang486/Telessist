import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceRequest } from '../model/servicerequest';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { GeneralService } from '../model/generalservice';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class MyhttpService {
  token:any;

  serviceRequests: ServiceRequest[] = [];
  serviceRequestGlobal: BehaviorSubject<Array<ServiceRequest>>;

  generalServices: GeneralService[] = [];

  constructor(private http:HttpClient) {
    this.token=sessionStorage.getItem("mytoken");
    this.serviceRequestGlobal = new BehaviorSubject<Array<ServiceRequest>>([]);
  }

  addServiceRequest(serviceR: ServiceRequest):Observable<any>{

    return this.http.post<ServiceRequest>('http://localhost:9000/api/telessist/user/addServiceRequest', serviceR, {
      headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token)
    }
    ).pipe(
      tap((res:any) => {
        this.serviceRequests.push(res);
        this.serviceRequestGlobal.next(this.serviceRequests);
        return this.serviceRequestGlobal;
      })
    );
  }

  // will add get serviceRequest if required - nice to have feature

  // get General Services by location 
  getGeneralServiceByLocation(location: String):Observable<any> {
    return this.http.get<Array<GeneralService>>('http://localhost:9092/api/telessist/viewServiceByLocation/'+ location);
  }

  // get client information
  getClientByClientId(clientId: any):Observable<any> {
    return this.http.get<Client>('http://localhost:8056/api/Client/viewClientById/'+clientId);
  }
}
