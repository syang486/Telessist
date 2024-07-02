import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Technician } from '../model/technician';
import { techRequest } from '../model/techRequest';
import { TechrequestService } from '../techrequest.service';
import { Client } from '../model/Client';
import { TechnicianService } from '../technician.service';

@Component({
  selector: 'app-agent-update-technician',
  templateUrl: './agent-update-technician.component.html',
  styleUrls: ['./agent-update-technician.component.css']
})
export class AgentUpdateTechnicianComponent {
  techRequest: techRequest = new techRequest();
  technicians: Array<Technician> = [];
  closeTechnicians: Array<Technician> = [];
  client: Client = new Client();
  constructor(private tService: TechrequestService,  private dialogref: MatDialogRef<AgentUpdateTechnicianComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private techService: TechnicianService){
    this.techRequest = data.techDetails;
    this.getAllTechnicians();
  }

  getAllTechnicians(){
    let dbTechs: Technician[] =[];
    this.tService.viewAllTechnicians().subscribe(
      res => {
        dbTechs = res;
        for (let tech of dbTechs){
          let index = this.technicians.findIndex((t) => t.technicianId === tech.technicianId);
          if (index === -1){
            this.technicians.push(tech);
          }
        }
        let ssTechs = this.techService.getTechnicians();
        for (let tech of ssTechs) {
          let index = this.technicians.findIndex((t) => t.technicianId === tech.technicianId);
          if (index === -1){
            this.technicians.push(tech);
          }
        }
        this.tService.getClientAddress(this.data.techDetails.clientId).subscribe(
          res => {
            this.client = res;
            console.log(this.client);
    
            let clientAddr = this.client.streetAddress + " " + this.client.city;
            console.log(clientAddr);
            for(let techs of this.technicians){
              this.tService.getDistance(clientAddr, techs?.techAddress).subscribe(
                res =>{
                  console.log(res);
                  if (res < 20){
                    this.closeTechnicians.push(techs);
                  }
                  // console.log(res);
                }, err => {
                  console.log(err);
                }
    
              )
            }
            console.log(this.closeTechnicians);
            this.technicians = this.closeTechnicians;
          }, 
          err => {
            console.log(err);
          }
        )
      }, err => {
        console.log(err);
      }
    )
    
  }

  
  assignTechnician(trId: any, tech: Technician){
    this.tService.addTechnicianToRequest(trId, tech).subscribe(
      res => {
        this.dialogref.close("Added Technician");
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }


}
