import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EquipmentRequest } from '../model/equipment-request.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Equipment } from '../model/equipment.model';
import { CallLog } from '../model/calllog';

@Injectable({
  providedIn: 'root'
})
export class EquipmentrequestservService {
  token:any;

  equipmentRequest : EquipmentRequest[] = [];
  equipmentRequestGlobal: BehaviorSubject<Array<EquipmentRequest>>;

  constructor(private httpclientobj : HttpClient) { 
    this.token = sessionStorage.getItem("mytoken");
    this.equipmentRequestGlobal = new BehaviorSubject<Array<EquipmentRequest>>([]);
  }

  addEquipmentRequest(equipRequest: EquipmentRequest) : Observable<EquipmentRequest> {
    
    return this.httpclientobj.post<EquipmentRequest>("http://localhost:9099/api/telessist/user/addEquipmentRequest", equipRequest, 
    {headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token),}
    ).pipe(
      tap((res:any) => {
        this.equipmentRequest.push(res)
        this.equipmentRequestGlobal.next(this.equipmentRequest);
        return this.equipmentRequestGlobal
      })
    )
  }

  getEquipment() : Observable<Array<Equipment>> {
    return this.httpclientobj.get<Array<Equipment>>("http://localhost:9091/api/telessist/viewAllEquipments")
  }



  getEquipmentRequest() {
   
    return this.httpclientobj.get<Array<EquipmentRequest>>("http://localhost:9099/api/telessist/agent/viewAllEquipmentRequests", {
      headers: new HttpHeaders().set('Authorization','Bearer '+ this.token),
    }).subscribe({
      next:(res:any) => {
        this.equipmentRequest = res;
        this.equipmentRequestGlobal?.next(this.equipmentRequest)
        
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  getEquipmentRequestsByDateAndStatus(date: Date, status: String): Observable<any>
  {
    return this.httpclientobj.get<Array<EquipmentRequest>>('http://localhost:9099/api/telessist/agent/viewERByDateAndStatus/'+date+'/'+status);
  }

  getAllEquipmentRequests() : Observable<any>{
    this.getEquipmentRequest()
    return this.equipmentRequestGlobal;
  }

  updateEquipmentRequest(equipRequest: EquipmentRequest) : Observable<any> {
    
    return this.httpclientobj.put<EquipmentRequest>("http://localhost:9099/api/telessist/agent/updateEquipmentRequest",equipRequest, {
      headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token),
    }).pipe(
      tap((res:any) => {
        const existEquipReq = this.equipmentRequest.find(e => e.equipmentRequestId === equipRequest.equipmentRequestId);
        if(existEquipReq){
          Object.assign(existEquipReq, equipRequest)
        }
        this.equipmentRequestGlobal.next(this.equipmentRequest);
        return this.equipmentRequestGlobal;
      })
    )
  }

  deleteEquipmentRequest(erId: any): Observable<any> {
    
    return this.httpclientobj.delete("http://localhost:9099/api/telessist/agent/deleteEquipmentRequest/"+erId, {
      headers: new HttpHeaders().set('Authorization','Bearer '+ this.token), responseType: 'text'
    }).pipe(
      tap((res:any)=> {
        let index = this.equipmentRequest.findIndex(e=>e.equipmentRequestId === erId);
        this.equipmentRequest.splice(index, 1);
        this.equipmentRequestGlobal.next(this.equipmentRequest);
        return this.equipmentRequestGlobal;
      })
    )
  }
  
  addCallLog(log:CallLog):Observable<any> {
    return this.httpclientobj.post<CallLog>('http://localhost:8187/CallLogs', log, {
      headers: new HttpHeaders({"Content-Type":"application/json"})
    });
  }

}
