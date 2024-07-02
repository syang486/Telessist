import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { EquipRequest } from '../model/equiprequest';
import { ServiceRequest } from '../model/servicerequest';
import { Technician } from '../model/technician';
import { TechRequest } from '../model/techrequest';
import { MyhttpTwoService } from '../services/myhttp-two.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent implements OnInit{

  @Input()
  indClient: Client = new Client();

  serviceRequests: ServiceRequest[] = [];
  equipRequests: EquipRequest[] = [];
  techRequests: TechRequest[] =[];

  message: string = "";

  constructor(private http: MyhttpTwoService, private snackBar:SnackbarService) {

  }

  ngOnInit(): void {
    this.loadServiceRequest();
    this.loadEquipRequest();
    this.loadTechRequest();
  }

  loadServiceRequest() {
    this.http.getServiceRequestsForClient(this.indClient.clientId).subscribe({
      next:(res:any) => {
        this.serviceRequests = res;
      }, 
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  loadEquipRequest() {
    this.http.getEquipmentRequestsForClient(this.indClient.clientId).subscribe({
      next:(res:any) => {
        this.equipRequests = res;
      }, 
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  loadTechRequest() {
    this.http.getTechRequestsForClient(this.indClient.clientId).subscribe({
      next:(res:any) => {
        this.techRequests = res;
        this.techRequests.forEach(t => {
          if(t.technician == null) {
            t.technician = {
              technicianId: "",
              techFirstName: "Unassigned",
              techLastName: "",
              techAddress: ""
          }
          }
        })
      }, 
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  deleteClient() {
    this.http.deleteClient(this.indClient.clientId).subscribe({
      next:(res:any) => {
        this.message = "Client has been Succesfully Deleted";
        this.snackBar.validSnackBar(this.message, 'Close');
      }, 
      error: (err:any) => {
        this.message = "Client has not been Deleted"
        this.snackBar.invalidSnackBar(this.message, 'Try Again');
        console.log(err);
      }
    })
  }
}
