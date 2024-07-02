import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ClientInfoService } from '../services/client-info.service';
import { Client } from 'src/app/authenticationmodule/models/client';

@Component({
  selector: 'app-client-frame',
  templateUrl: './client-frame.component.html',
  styleUrls: ['./client-frame.component.css']
})
export class ClientFrameComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;  
  client: Client = new Client();
  clientId: any;
  clientName: any;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private http: ClientInfoService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.clientId = sessionStorage.getItem("clientId");
  }
  ngOnInit(): void {
    this.loadClientById();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  loadClientById() {
    this.http.getClientByClientId(this.clientId).subscribe({
      next: (res:any) => {
        this.client = res;
        this.clientName = res.firstName + " " + res.lastName;
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }
}
