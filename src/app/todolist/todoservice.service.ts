import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ServiceRequest } from './model/servicerequest';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {
  token:any;

  serviceRequests: ServiceRequest[] = [];
  serviceRequestGlobal: BehaviorSubject<Array<ServiceRequest>>;

  constructor(private http:HttpClient) {
    this.token = sessionStorage.getItem("mytoken");
    this.serviceRequestGlobal = new BehaviorSubject<Array<ServiceRequest>>([]);
  }

  getAllServiceRequest() : Observable<any> {
    return this.http.get<Array<ServiceRequest>>('http://localhost:9000/api/telessist/agent/viewAllServiceRequests', {
      headers: new HttpHeaders({"Content-type": "application/json",
                                "Authorization": `Bearer ` + this.token
                              })
    })
  }

  // fetchServiceRequests() {
  //   return this.http.get<Array<ServiceRequest>>('http://localhost:9000/api/telessist/agent/viewAllServiceRequests', {
  //     headers: new HttpHeaders().set('Authorization','Bearer '+ this.token)
  //   }).subscribe({
  //     next:(res:any) => {
  //       this.serviceRequests = res;
  //       this.serviceRequestGlobal?.next(this.serviceRequests);
  //     },
  //     error:(err:any)=>{
  //       console.log(err);
  //     }
  //   })
  // }

  // getAllServiceRequest():Observable<any> {
  //   return this.serviceRequestGlobal;
  // }

  updateServiceRequest(serviceR: ServiceRequest):Observable<any> {
    return this.http.put<ServiceRequest>('http://localhost:9000/api/telessist/agent/updateServiceRequest', serviceR, {
      headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token)
    }
    ).pipe(
      tap((res:any) => {
        const existService = this.serviceRequests.find(s => s.serviceRequestId === serviceR.serviceRequestId);
        if(existService) {
          Object.assign(existService, serviceR);
        }
        this.serviceRequestGlobal.next(this.serviceRequests);
        return this.serviceRequestGlobal;
      })
    );
  }

  // deleteServiceRequest(id: any):Observable<any> {
  //   return this.http.delete('http://localhost:9000/api/telessist/agent/deleteServiceRequest/' + id, {
  //     headers: new HttpHeaders().set('Authorization',"Bearer "+ this.token)
  //   }
  //   ).pipe(
  //     tap((res:any) => {
  //       let index = this.serviceRequests.findIndex(s => s.serviceRequestId === id);
  //       this.serviceRequests.splice(index, 1);
  //       this.serviceRequestGlobal.next(this.serviceRequests);
  //       return this.serviceRequestGlobal;
  //     })
  //   );
  // }

  // addCallLog(log:CallLog):Observable<any> {
  //   return this.http.post<CallLog>('http://localhost:8187/CallLogs', log, {
  //     headers: new HttpHeaders({"Content-Type":"application/json"})
  //   });
  // }
}
