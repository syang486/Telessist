import { Component } from '@angular/core';
import { AgentmanageserviceService } from '../agentmanageservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from '../agentModel';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AgentLoginModel } from '../agent-login.model';

@Component({
  selector: 'app-addupdate-agent-dialog',
  templateUrl: './addupdate-agent-dialog.component.html',
  styleUrls: ['./addupdate-agent-dialog.component.css']
})
export class AddupdateAgentDialogComponent {

  uuid:string;
  agent: Agent = new Agent();
  addAgent: FormGroup;
  message: string = "";
  login: AgentLoginModel = new AgentLoginModel();

  constructor(private http: AgentmanageserviceService, private builder: FormBuilder, private snackBar: SnackbarService,
    private dialogref: MatDialogRef<AddupdateAgentDialogComponent>, ) {
    this.uuid = self.crypto.randomUUID();

    this.addAgent = this.builder.group({
      agentId: [this.uuid],
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      firstName:  ['', [Validators.required, Validators.maxLength(50),Validators.pattern("[a-zA-Z][a-zA-Z]+")]],
      lastName:  ['', [Validators.required, Validators.maxLength(50),Validators.pattern("[a-zA-Z][a-zA-Z]+")]],
      email: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['', [Validators.required, Validators.maxLength(50)]]
    })
  }

  ngOnInit(): void {
  }
 
  addAgentForm() {

    this.agent = {
      agentId: this.addAgent.value.agentId,
      userName:this.addAgent.value.userName,
      firstName: this.addAgent.value.firstName,
      lastName: this.addAgent.value.lastName,
      email: this.addAgent.value.email
    }

    if(this.addAgent.valid) {
      this.http.postAgent(this.agent).subscribe({
        next:(res:any) => {
          console.log(res);
          this.addLogin();
          this.message = "Agent successfully Added!";
          this.snackBar.validSnackBar(this.message, 'Close');
          this.dialogref.close("Added");
        }, 
        error: (err:any) => {
          this.message = "Agent could not be saved";
          this.snackBar.invalidSnackBar(this.message, 'Try Again');
          console.log(err);
        }
      })
    } else {
      this.message = "Please fill out the form accordingly";
      this.snackBar.invalidSnackBar(this.message, 'Try Again');
    }
  }
  
  addLogin() {
    this.login = {
      firstName: this.addAgent.value.firstName,
      lastName: this.addAgent.value.lastName,
      username: this.addAgent.value.userName,
      password: this.addAgent.value.password
    }

    this.http.registerAgent(this.login).subscribe({
      next:(res:any) => {
        console.log("Added");
      }, 
      error: (err:any) => {
        console.log(err);
      }
    })
  }
}
