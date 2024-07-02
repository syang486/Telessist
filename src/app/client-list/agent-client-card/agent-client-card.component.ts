import { Component, Input } from '@angular/core';
import { Client } from '../model/client';
import { EquipRequest } from '../model/equiprequest';
import { ServiceRequest } from '../model/servicerequest';
import { TechRequest } from '../model/techrequest';
import { MyhttpTwoService } from '../services/myhttp-two.service';

@Component({
  selector: 'app-agent-client-card',
  templateUrl: './agent-client-card.component.html',
  styleUrls: ['./agent-client-card.component.css']
})
export class AgentClientCardComponent {
  @Input()
  indClient: Client = new Client();

  serviceRequests: ServiceRequest[] = [];
  equipRequests: EquipRequest[] = [];
  techRequests: TechRequest[] =[];

  constructor(private http: MyhttpTwoService) {

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

}
