import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../models/client';
import { ClientLoginModel } from '../models/client-login.model';
import { ClientRegistrationModel } from '../models/registration.model';
import { MyrouterService } from 'src/app/services/myrouter.service';
import { RegistrationService } from '../service/registration.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formValues!:FormGroup;
  RegistrationObject:ClientRegistrationModel = new ClientRegistrationModel();
  client: Client = new Client();
  uuid: string;
  clientLogin: ClientLoginModel = new ClientLoginModel();
  message: string = "";

  constructor(private resgistrationService:RegistrationService, private formBuilder:FormBuilder, private routerobj: MyrouterService,
    private snackBar: SnackbarService) {
    this.uuid = self.crypto.randomUUID();
  }

  ngOnInit():void{
    this.formValues = this.formBuilder.group({
      firstName:['', [Validators.required, Validators.maxLength(50),Validators.pattern("[a-zA-Z][a-zA-Z]+")]],
      lastName:['', [Validators.required, Validators.maxLength(50),Validators.pattern("[a-zA-Z][a-zA-Z]+")]],
      username:['',Validators.required],
      password:['',Validators.required],
      streetAddress: ['',Validators.required],
      province: ['',Validators.required],
      city: ['', [Validators.required, Validators.maxLength(50),Validators.pattern("[a-zA-Z][a-zA-Z]+")]],
      postalCode:['', [Validators.required, Validators.pattern("^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]$")]],
      phoneNumber: ['', [Validators.required]]
    })
  }


  registerUser() {
    if(this.formValues.valid) {
      this.client = {
        clientId: this.uuid,
        userName: this.formValues.value.username,
        firstName: this.formValues.value.firstName,
        lastName: this.formValues.value.lastName,
        phoneNumber: this.formValues.value.phoneNumber,
        streetAddress: this.formValues.value.streetAddress,
        city: this.formValues.value.city,
        province: this.formValues.value.province,
        postalCode: this.formValues.value.postalCode
      }

      this.clientLogin = {
        firstName: this.formValues.value.firstName,
        lastName: this.formValues.value.lastName,
        email: "",
        username: this.formValues.value.username,
        password:this.formValues.value.password
      }

      this.resgistrationService.addClient(this.client).subscribe({
        next:(res:any) => {
          console.log(res);
          this.resgistrationService.register(this.clientLogin).subscribe({
            next:(res:any) => {
              console.log(res);
              this.routerobj.openLogin();
            },
            error:(err:any) =>{
              this.snackBar.invalidSnackBar(JSON.stringify(err.error.Description), 'Try Again');
              this.clearForm();
              console.log(err);
            }
          })
        },
        error:(err:any) =>{
          this.snackBar.invalidSnackBar(JSON.stringify(err.error.Description), 'Try Again');
          this.clearForm();
          console.log(err);
        }
      })
    } else {
      this.message = "Please fill out the form accordingly";
      this.snackBar.invalidSnackBar(this.message, 'Try Again');
    }
  }

  clearForm() {
    this.formValues.reset();
  }
}
