import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MyrouterService } from 'src/app/services/myrouter.service';

@Injectable({
  providedIn: 'root'
})
export class ClientdashboardGuard implements CanActivate {
  
  constructor(private routerobj: MyrouterService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let tok = sessionStorage.getItem("mytoken");
      let status = sessionStorage.getItem("isClient");

      if(!tok || tok == undefined || status != 'true') {
        this.routerobj.openLogin();
      }
      return true;
  }
  
}
