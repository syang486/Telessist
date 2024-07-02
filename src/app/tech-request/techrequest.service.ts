import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { techRequest } from './model/techRequest';
import { Technician } from './model/technician';
import { CallLog } from './model/calllog';

@Injectable({
  providedIn: 'root'
})
export class TechrequestService {
  token: any;
  clientId : any;
 
  techRequests: techRequest[] = [];
  // techRequestsGlobal: BehaviorSubject<Array<techRequest>>;
  techRequestsGlobal: BehaviorSubject<Array<techRequest>>;
  private apiUrl = "http://localhost:8085/api/telessist"

  constructor(private httpClientObj : HttpClient) {
    this.token = sessionStorage.getItem("mytoken");
    this.clientId = sessionStorage.getItem("clientId");
    this.techRequestsGlobal = new BehaviorSubject<Array<techRequest>>([]);
   }
    
  addTechRequest(techRequest : techRequest) : Observable<techRequest>{
    return this.httpClientObj.post(this.apiUrl + "/user/addTechRequest", techRequest, {
      headers: new HttpHeaders({"Content-type": "application/json",
                                "Authorization": `Bearer ` + this.token
                              })
    }).pipe(
      tap((res:any) => {
        this.techRequests.push(res);
        this.techRequestsGlobal.next(this.techRequests);
        return this.techRequestsGlobal;
      })
    );
  }

  viewAllTechRequests() : Observable<any> {
    return this.httpClientObj.get<Array<techRequest>>(this.apiUrl + "/agent/viewAllTechRequests", {
      headers: new HttpHeaders({"Content-type": "application/json",
                                "Authorization": `Bearer ` + this.token
                              })
    })
  }

  deleteTechRequest(id: any) : Observable<any> {
    return this.httpClientObj.delete(this.apiUrl + `/agent/deleteTechRequ/${id}`, {
      headers: new HttpHeaders({"Content-type": "application/json",
                                "Authorization": `Bearer ` + this.token
                              })
      }).pipe(
        tap((res:any) => {
          let index = this.techRequests.findIndex(t => t.techRequestId === id);
          this.techRequests.splice(index, 1);
          this.techRequestsGlobal.next(this.techRequests);
          return this.techRequestsGlobal;
        })
      )
  }

  updateTechRequest(tRequest: techRequest) : Observable<any> {
    return this.httpClientObj.put(this.apiUrl + `/agent/updateTechRequ/${tRequest.techRequestId}`, tRequest, {
      headers: new HttpHeaders({"Content-type": "application/json",
                                "Authorization": `Bearer ` + this.token
                              })
      }).pipe(
        tap((res:any) => {
          const existService = this.techRequests.find(t => t.techRequestId === tRequest.techRequestId);
          if (existService){
            Object.assign(existService, tRequest);
          }
          this.techRequestsGlobal.next(this.techRequests);
          return this.techRequestsGlobal;
        })
      )
  }

  viewAllTechnicians() : Observable<any> {
    return this.httpClientObj.get<Array<Technician>>(this.apiUrl + "/agent/viewAllTechnician", {
      headers: new HttpHeaders({"Content-type": "application/json",
                                "Authorization": `Bearer ` + this.token
                              })
    })
  }
  addTechnicianToRequest(techRequestId: any, technician: Technician): Observable<any> {
    return this.httpClientObj.post(this.apiUrl + `/agent/addTechnician/${techRequestId}`, technician, {
      headers: new HttpHeaders({"Content-type": "application/json",
      "Authorization": `Bearer ` + this.token
    })
    })
  }

  removeTechnicianFromRequest(techRequestId: any, technicianId: any): Observable<any> {
    return this.httpClientObj.delete(this.apiUrl + `/agent/deleteTechnician/${techRequestId}/${technicianId}`,{
      headers: new HttpHeaders({"Content-type": "application/json",
      "Authorization": `Bearer ` + this.token
    })
    })
  }
  // getTechRequestByClientId(clientId: any) : Observable<any>{
  //   return this.httpClientObj.get<Array<techRequest>>(this.apiUrl + `/agent/viewechRequByClientId/${clientId}`);
  // }

  addCallLog(log:CallLog):Observable<any> {
    return this.httpClientObj.post<CallLog>('http://localhost:8187/CallLogs', log, {
      headers: new HttpHeaders({"Content-Type":"application/json"})
    });
  }
  getClientAddress(clientId: any): Observable<any>{
    return this.httpClientObj.get(`http://localhost:8056/api/Client/viewClientById/${clientId}`, 
    // return this.httpClientObj.get('http://localhost:8056/api/Client/viewClientById/client1',
    {
      headers: new HttpHeaders({"Content-type": "application/json"})
      // "Authorization": `Bearer ` + this.testToken
    });
  }
  
  getDistance(clientAddr: any, techAddr: any) {
    const url = `https://www.mapquestapi.com/directions/v2/route?key=cGHToWtB6T8UP1dHEDxdGRt9pivXeQfV&from=${clientAddr}&to=${techAddr}&unit=k`
    return this.httpClientObj.get(url).pipe(
      map((response: any) => {
        const distance = response.route.distance;
        return distance;
      })
    );
  }
}
