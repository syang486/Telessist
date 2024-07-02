import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminLoginModel } from '../models/admin-login.model';
import { AgentLoginModel } from '../models/agent-login.model';
import { ClientLoginModel } from '../models/client-login.model';
import { Usertype } from '../models/Usertype.model';
import { UserLoginService } from '../service/user-login.service';
import { Router } from '@angular/router';
import { Agent } from '../models/agent';
import { Client } from '../models/client';
import { MyrouterService } from 'src/app/services/myrouter.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public formValues!: FormGroup;
  loginDataObject: any;
  user: Usertype = new Usertype();
  agent: Agent = new Agent();
  agentId: any;
  client: Client = new Client();
  clientId: any;
  message: string = "";

  constructor(private formBuilder: FormBuilder, private loginService: UserLoginService, private router: Router, private routerobj:MyrouterService,
    private snackBar:SnackbarService) { }
  ngOnInit(): void {
    this.formValues = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      userType: ['', Validators.required]
    })
  }

  userLogin() {

    console.log(this.formValues.value.userType);

    if (!this.formValues) {
      console.error('formValues is undefined!');
      return;
    }

    this.user.usertype = this.formValues.value.userType;
    if (this.user.usertype == 'admin') {

      this.loginDataObject = new AdminLoginModel();
      this.loginDataObject.username = this.formValues.value.username;
      this.loginDataObject.password = this.formValues.value.password;
    }
    else if (this.user.usertype == 'client') {

      this.loginDataObject = new ClientLoginModel();
      this.loginDataObject.username = this.formValues.value.username;
      this.loginDataObject.password = this.formValues.value.password;
    }

    else if (this.user.usertype == 'agent') {

      this.loginDataObject = new AgentLoginModel();
      this.loginDataObject.username = this.formValues.value.username;
      this.loginDataObject.password = this.formValues.value.password;
    }

    this.loginService.login(this.loginDataObject, this.user).subscribe({
        next:(res:any) => {
          sessionStorage.setItem("mytoken", res.token);
          if(this.user.usertype == "admin") {
            sessionStorage.setItem("isAdmin", 'true');
            sessionStorage.setItem("adminId", res.Id);
            this.routerobj.openAdminDashboard();
          } else if (this.user.usertype == "agent") {
            sessionStorage.setItem("isAgent", 'true');
            this.loginService.getAgentIdByUserName(this.loginDataObject.username).subscribe({
              next:(res:any) =>{
                this.agent = res;
                this.agentId = this.agent.agentId;
                sessionStorage.setItem("csrId", this.agentId);
                this.routerobj.openAgentDashboard();
              },
              error:(err:any) =>{
                this.message = "Client Id cannot be retrieved"
                this.snackBar.invalidSnackBar(this.message, 'Try Again');
                console.log(err);
              }
            })
          } else {
            sessionStorage.setItem("isClient", 'true');
            this.loginService.getClientIdByUserName(this.loginDataObject.username).subscribe({
              next:(res:any) =>{
                this.client = res;
                this.clientId = this.client.clientId;
                sessionStorage.setItem("clientId", this.clientId);
                this.routerobj.openClientDashboard();
              },
              error:(err:any) =>{
                this.message = "Client Id cannot be retrieved"
                this.snackBar.invalidSnackBar(this.message, 'Try Again');
                console.log(err);
              }
            })
          }
        },
        error:(err:any) =>{
          this.snackBar.invalidSnackBar(JSON.stringify(err.error.Description), 'Try Again');
          console.log(err);
        }
      });
  }
}