import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EquipmentInventory } from '../model/equipmentinventory';
import { EquipmentRequest } from '../model/equipmentrequest';
@Injectable({
  providedIn: 'root'
})
export class EquipmentManagementServiceService {

  token:any;
  agenttoken:any;

  equipmentList : EquipmentInventory[] = [];
  equipmentListGlobal: BehaviorSubject<Array<EquipmentInventory>>;
  equipmentRequestList : EquipmentRequest[] = [];
  equipmentRequestListGlobal: BehaviorSubject<Array<EquipmentRequest>>;
  
  constructor(private httpclientobj:HttpClient){
    this.token = sessionStorage.getItem("mytoken");
    this.equipmentListGlobal = new BehaviorSubject<Array<EquipmentInventory>>([]);
    this.equipmentRequestListGlobal = new BehaviorSubject<Array<EquipmentRequest>>([]);
  }

  saveEquipment(equip : EquipmentInventory):Observable<any>{
    return this.httpclientobj.post('http://localhost:9091/api/telessist/admin/addEquipment', equip, {
      headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token)
    }).pipe(
      tap((res:any)=>{
        this.equipmentList.push(equip);
        this.equipmentListGlobal.next(this.equipmentList);
        return this.equipmentListGlobal;
      })
    )
  }

  fetchEquipments(){
    return this.httpclientobj.get<Array<EquipmentInventory>>('http://localhost:9091/api/telessist/viewAllEquipments').subscribe({
      next:(res:any)=>{
        this.equipmentList = res;
        this.equipmentListGlobal?.next(this.equipmentList);
      },
      error:(err:any)=>{
        console.log(err);
    }
    })
  }

  getAllEquipments():Observable<any>{
    return this.equipmentListGlobal;
  }

  deleteEquipment(id:any):Observable<any>{
    return this.httpclientobj.delete<EquipmentInventory>('http://localhost:9091/api/telessist/admin/deleteEquipment/'+id, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
    }).pipe(
      tap((res:any)=>{
        let ind = this.equipmentList.findIndex(ele=>ele.equipmentId===id);
        this.equipmentList.splice(ind, 1);
        this.equipmentListGlobal.next(this.equipmentList);
        return this.equipmentListGlobal;
      })
    );
  }

  updateEquipment(equip: EquipmentInventory):Observable<any>{
    return this.httpclientobj.put<EquipmentInventory>('http://localhost:9091/api/telessist/admin/updateEquipment', equip, {
      headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token)
    }).pipe(
      tap((res:any)=>{
        const existEquipment = this.equipmentList.find(ele=>ele.equipmentId===equip.equipmentId);
        if(existEquipment){
          Object.assign(existEquipment, equip);
        }
        this.equipmentListGlobal.next(this.equipmentList);
        return this.equipmentListGlobal;
      })
    )
  }

  fetchEquipmentRequests(){
    return this.httpclientobj.get<Array<EquipmentRequest>>('http://localhost:9099/api/telessist/agent/viewAllEquipmentRequests', {
      headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token)
    }).subscribe({
      next:(res:any)=>{
        this.equipmentRequestList = res;
        this.equipmentRequestListGlobal?.next(this.equipmentRequestList);
      },
      error:(err:any)=>{
        console.log(err);
    }
    })
  }

  getAllEquipmentRequests():Observable<any>{
    return this.equipmentRequestListGlobal;
  }
}
