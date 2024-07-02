import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TechrequestService } from '../techrequest.service';
import { techRequest } from '../model/techRequest';
import { SnackbarService } from 'src/app/service-request/services/snackbar.service';

@Component({
  selector: 'app-tech-request',
  templateUrl: './tech-request.component.html',
  styleUrls: ['./tech-request.component.css']
})
export class TechRequestComponent implements OnInit {
  form: FormGroup;
  techRequest: techRequest;
  techRequests : Array<techRequest> = [];
  message: string = "";
  client: any;

  constructor(private tRequestService: TechrequestService, private formBuilder: FormBuilder, private route: ActivatedRoute, private snackBar: SnackbarService) {
    this.client = sessionStorage.getItem('clientId');
    this.form = this.formBuilder.group({
      //clientId:[sessionStorage.getItem('clientId')],
      description: ['', Validators.compose([Validators.required])]

    })
    this.techRequest = new techRequest();
    // this.getClientTechRequests();
  }
  ngOnInit(): void {
    // this.getClientTechRequests();
  }


  addTechRequest(){
    if(this.form.valid){

      this.techRequest = {
        "techRequestId": crypto.randomUUID(),
        "clientId": this.client,
        "techRequestDesc": this.form.get("description")?.value,
      }
      
      this.tRequestService.addTechRequest(this.techRequest).subscribe(
        
        (res: any) => {
          this.message = "Tech Request successfully submitted!";
            this.snackBar.validSnackBar(this.message, 'Close');
          this.form.reset();
        }, (error: any) => {
          this.message = "Tech Request was not submitted";
          this.snackBar.invalidSnackBar(this.message, 'Try Again');
          console.log(error);
        }
      )
    } else {
      this.message = "Please fill out the form accordingly";
      this.snackBar.invalidSnackBar(this.message, 'Try Again');
    }
    this.clearForm();
  }  

  clearForm() {
    this.form.reset();
  }
}
