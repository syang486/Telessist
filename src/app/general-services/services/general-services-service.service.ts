import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralServices } from '../models/general-services';
import { Promotion } from '../models/promotion';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeneralServicesServiceService {
  token:any;

  generalServices: GeneralServices[] = [];
  generalServicesGlobal : BehaviorSubject<Array<GeneralServices>>;
  

  constructor(private httpclientObj: HttpClient) { 
    this.token = sessionStorage.getItem("mytoken");
    this.generalServicesGlobal = new BehaviorSubject<Array<GeneralServices>>([]);
  }

  fetchGeneralServices(){
    return this.httpclientObj.get<Array<GeneralServices>>('http://localhost:9092/api/telessist/viewAllServices', {
      headers: new HttpHeaders().set('Authorization','Bearer '+ this.token)
    }).subscribe({
      next:(res:any)=>{
        this.generalServices = res;
        this.generalServicesGlobal?.next(this.generalServices);
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }

  viewAllGeneralServices(){
    return this.generalServicesGlobal;
  }

  getGeneralService(serviceId: string){
    return this.httpclientObj.get<GeneralServices>('http://localhost:9092/api/telessist/viewService/' + serviceId);
  }

  addGeneralService(genServ: GeneralServices){
    return this.httpclientObj.post('http://localhost:9092/api/telessist/admin/addService', genServ, {
      headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token)
    }).pipe(
      tap((res: any) => {
        this.generalServices.push(res);
        this.generalServicesGlobal.next(this.generalServices);
        return this.generalServicesGlobal;
      })
    );
  }

  updateGeneralService(genServ: GeneralServices, serviceId : string){
    return this.httpclientObj.put('http://localhost:9092/api/telessist/admin/updateService/' + serviceId, genServ ,{
      headers: new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token)
    }).pipe(
      tap((res:any)=>{
        const existService = this.generalServices.find(gs => gs.serviceId === serviceId);
        if(existService){
          Object.assign(existService, genServ);
        }
        this.generalServicesGlobal.next(this.generalServices);
        return this.generalServicesGlobal;
      })
    );
  }

  deleteGeneralService(serviceId : any): Observable<any>{
    return this.httpclientObj.delete<any>(`http://localhost:9092/api/telessist/admin/deleteService/${serviceId}`, {
      headers: new HttpHeaders().set('Authorization',"Bearer "+ this.token)
    })
    .pipe(
      tap((res: any) => {
        const index = this.generalServices.findIndex(gs => gs.serviceId === serviceId);
        this.generalServices.splice(index, 1);
        this.generalServicesGlobal.next(this.generalServices);
        return this.generalServicesGlobal;
      })
    );
  }

  viewAllPromotion(serviceId : string){
    return this.httpclientObj.get<Array<Promotion>>(`http://localhost:9092/api/telessist/viewPromotion/${serviceId}`);
  }

  addPromotion(serviceId: string, promo: Promotion){
    return this.httpclientObj.post('http://localhost:9092/api/telessist/admin/addPromotion/' + serviceId, promo, {
      headers : new HttpHeaders().set('Content-Type','application/json').set('Authorization',"Bearer "+ this.token)
    }).pipe(
      tap((res:any)=>{
        const existService = this.generalServices.find(gs => gs.serviceId === serviceId);
        if(existService){
          Object.assign(existService, res);
        }
        this.generalServicesGlobal.next(this.generalServices);
        return this.generalServicesGlobal;
      })
    );
  }
  deletePromotion(serviceId: string, promoId: string){
    return this.httpclientObj.delete(`http://localhost:9092/api/telessist/admin/deletePromotion/${serviceId}/${promoId}`, {
      headers: new HttpHeaders().set('Authorization',"Bearer "+ this.token)
    }).pipe(
      tap((res: any) => {
        const existService = this.generalServices.find(gs => gs.serviceId === serviceId);
        const promoList = existService?.promotion;
        let index = promoList?.findIndex(p => p.promoId === promoId);
        promoList?.splice(index!,1);
        existService!.promotion = promoList;
        Object.assign(this.generalServices.find(gs => gs.serviceId === serviceId)!, existService);
        this.generalServicesGlobal.next(this.generalServices);
        return this.generalServicesGlobal;
      })
    );
  }

}
