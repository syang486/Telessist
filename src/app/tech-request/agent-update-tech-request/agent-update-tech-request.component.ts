import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { techRequest } from '../model/techRequest';
import { TechrequestService } from '../techrequest.service';

@Component({
  selector: 'app-agent-update-tech-request',
  templateUrl: './agent-update-tech-request.component.html',
  styleUrls: ['./agent-update-tech-request.component.css']
})
export class AgentUpdateTechRequestComponent {
  techRequest: techRequest = new techRequest();
  updateForm: FormGroup;
  csrId: any = sessionStorage.getItem("csrId");
  statuses: String[] = [];
  requestsList : Array<any>;
  message: string = "";
  ngOnInit(){
  
  }
  constructor(private builder: FormBuilder, private tService: TechrequestService, private dialogref: MatDialogRef<AgentUpdateTechRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private datePipe: DatePipe){
      this.techRequest = data.techDetails;
      this.updateForm = this.builder.group({
        techRequestId:[this.techRequest.techRequestId],
        dateOfTechRequest:[this.techRequest.dateOfTechRequest],
        clientId:[this.techRequest.clientId],
        techRequestDesc:[this.techRequest.techRequestDesc],
        techScheduledDate:[this.techRequest.techScheduledDate],
        techRequestStatus:['', [Validators.required]],
        csrId: [this.csrId]
      })
      this.statuses = ["Pending", "Active", "Inactive"];
      this.requestsList = [];

      this.updateForm.patchValue({
        techRequestStatus: this.techRequest.techRequestStatus
      })

    }
  updateTechRequest(){
    if (this.updateForm.valid){
      console.log(this.updateForm.value.techScheduledDate);
      this.updateForm.value.scheduledDate = this.datePipe.transform(this.updateForm.value.scheduledDate, 'yyyy-MM-dd');
      console.log(this.updateForm.value);
      this.tService.updateTechRequest(this.updateForm.value).subscribe(
        res => {
          this.message = "Tech Request has been updated";
          this.dialogref.close("Updated")
          console.log(res);

        }, 
        err => {
          this.message = err;
          console.log(err);
        }
      )
    }
    else{
      this.message = "Please update the form with all fields"
    }
  }
}
