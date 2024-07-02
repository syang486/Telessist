import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/service-request-form/model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {

  constructor(private http: HttpClient) { }

  getClientByClientId(id: any) {
    return this.http.get<Array<Client>>('http://localhost:8056/api/Client/viewClientById/' + id);
  }
}
