import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Client } from '../models/client';


//this class subscribe to my API methods
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private router: Router) { }


  //rootUrl = environment.API_ENDPOINT;
  endPoint = 'http://localhost:8001/api/AuthUsers/register';

  //POST (Add new record)
  register(data: any): Observable<any> {
    console.log("register method!");

    return this.http.post<any>(this.endPoint, data)
      .pipe(map((res: any) => {
        console.log("inside");
        console.log(res);
        return res;
      }));
  }

  addClient(client: Client):Observable<any> {
    return this.http.post<Client>('http://localhost:8056/api/Client/addClient', client, {
      headers: new HttpHeaders({"Content-Type":"application/json"})
    })
  }
}




//  register(data:any):Observable {

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': 'http://localhost:4200'
    //   })
    // };

    
 

  //   this.http.post(endPoint, data).subscribe(
  //     (response:any)=>{
  //       console.log("Registration successful");
  //       console.log(response);

  //       //redirects user to login page with the route i set up in my routing module
  //       this.router.navigate(['login']);
  //     },

  //     (error:any)=>{
  //       console.error('Registration failed');
  //       console.error(error);
  //     }
  //   )
  // }