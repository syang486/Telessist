import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/service-request-form/model/client';
import { ClientInfoService } from '../services/client-info.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  client: Client;
  clientId:any;

  constructor(private http: ClientInfoService) {
    this.client = new Client();
    this.clientId = sessionStorage.getItem("clientId");
  }
  ngOnInit(): void {
    this.loadClientById();
  }

  loadClientById() {
    this.http.getClientByClientId(this.clientId).subscribe({
      next: (res:any) => {
        this.client = res;
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }
}
