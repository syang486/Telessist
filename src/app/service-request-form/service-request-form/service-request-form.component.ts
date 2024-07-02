import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '../model/client';
import { GeneralService } from '../model/generalservice';
import { MyhttpService } from '../services/myhttp.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-service-request-form',
  templateUrl: './service-request-form.component.html',
  styleUrls: ['./service-request-form.component.css']
})
export class ServiceRequestFormComponent implements OnInit {
  serviceForm:FormGroup;
  generalServices:Array<GeneralService> = [];
  generalServicesByLocation:Array<GeneralService> = [];
  message: string = "";
  location:any;
  region:any;
  client:Client;
  promotion:string = "";
  selected:string = "";
  clientIdentification:any;

  constructor(private http:MyhttpService, private builder:FormBuilder, private snackBar:SnackbarService, private snack:MatSnackBar){
    this.clientIdentification = sessionStorage.getItem('clientId');
    this.serviceForm = this.builder.group({
      serviceId:['', [Validators.required]],
      serviceRequestDesc: ['', [Validators.required]]
    })
    this.client = new Client();
    
  }

  ngOnInit(): void {
    this.loadClientInformation();
  }

  changePromo() {
    let serviceChosen = this.generalServicesByLocation.find(s => s.serviceId == this.selected);
    let promotionFound = serviceChosen?.promotion?.find(p => p.region === this.region);
    console.log(promotionFound)
    if(promotionFound == null || promotionFound === undefined) {
      this.promotion = "None";
    } else {
      this.promotion = promotionFound?.promoName + ": discount $" + promotionFound?.discount;
    }
  }

  loadClientInformation() {
    this.http.getClientByClientId(sessionStorage.getItem("clientId")).subscribe({
      next:(res:any) => {
        this.client = res;
        this.location = this.client.province;
        this.region = this.client.city;

          this.http.getGeneralServiceByLocation(this.location).subscribe({
            next:(res:any) => {
              console.log(this.location);
              this.generalServices = res;
              this.generalServicesByLocation = this.generalServices.filter(s => s.location === this.location);
              console.log(this.generalServicesByLocation);
            }, 
            error: (err:any) => {
              console.log(err);
            }
          })
      }, 
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  addServiceRequest() {
    let clientInfo = {
      clientId: this.clientIdentification,
      serviceId:this.serviceForm.value.serviceId,
      serviceRequestDesc: this.serviceForm.value.serviceRequestDesc
    }

    console.log(clientInfo)
    if(this.serviceForm.valid) {
      this.http.addServiceRequest(clientInfo).subscribe({
        next:(res:any) => {
          this.message = "Service Request successfully submitted!";
          this.snackBar.validSnackBar(this.message, 'Close');
        }, 
        error: (err:any) => {
          this.message = "Service Request could not be submitted";
          this.snackBar.invalidSnackBar(this.message, 'Try Again');
          console.log(err);
        }
      })
    } else {
      this.message = "Please fill out the form accordingly";
      this.snackBar.invalidSnackBar(this.message, 'Try Again');
    }
    this.clearForm();
  }

  clearForm() {
    this.serviceForm.reset();
  }
}
