import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from '../agentModel';
import { AgentmanageserviceService } from '../agentmanageservice.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {

  agent: Agent = new Agent();
  updateAgent: FormGroup;
  message: string = "";

  constructor(private builder: FormBuilder, private http: AgentmanageserviceService, private dialogref: MatDialogRef<UpdateDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any, private snackBar:SnackbarService) {
      this.agent = data.agentDetails;

      this.updateAgent = this.builder.group({
        agentId: [this.agent.agentId],
        userName: ['', [Validators.required]],
        firstName:  ['', [Validators.required]],
        lastName:  ['', [Validators.required]],
        email: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
      });
      
      this.updateAgent.patchValue({
        userName: this.agent.userName,
        firstName: this.agent.firstName,
        lastName: this.agent.lastName,
        email: this.agent.email
      })
  }

  updateAgentForm() {
    if(this.updateAgent.valid) {
      this.http.updateAgent(this.updateAgent.value, this.agent.agentId).subscribe({
        next:(res:any)=>{
          this.message="Agent has been updated!";
          this.dialogref.close("Updated");
          this.snackBar.validSnackBar(this.message, 'Close');
        },
        error:(err:any)=>{
          this.message="Agent could not be updated."
          this.snackBar.invalidSnackBar(this.message, 'Try Again');
          console.log(err);
        }
      })
    } else {
      this.message = "Please update the form with all fields!"
      this.snackBar.invalidSnackBar(this.message, 'Try Again');
    }
  }
}
