import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/service-request/services/snackbar.service';
import { CallLog } from '../model/calllog';
import { techRequest } from '../model/techRequest';
import { TechrequestService } from '../techrequest.service';


@Component({
  selector: 'app-tech-calllog-dialog',
  templateUrl: './tech-calllog-dialog.component.html',
  styleUrls: ['./tech-calllog-dialog.component.css']
})
export class TechCalllogDialogComponent {
  uuid: string;
  csrId: any;;
  callLog: CallLog = new CallLog();
  tRequest: techRequest;
  callTypes: string[];
  callDesc: string[];

  callForm: FormGroup;
  message: string = "";

  constructor(private builder: FormBuilder, private tService: TechrequestService, private dialogref: MatDialogRef<TechCalllogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private snackBar: SnackbarService) {
      this.uuid = self.crypto.randomUUID();
      this.tRequest = data.techDetails;
      this.csrId = sessionStorage.getItem("csrId");
      this.callTypes = ['Incoming', 'Outgoing'];
      this.callDesc = ['Add Service', 'Remove Service', 'Send Equipment', 'Return Equipment', 'Schedule Technician', 'Cancel Technician', 'Others'];

      this.callForm = this.builder.group({
        callDate: ['', [Validators.required]],
        callTime: ['', [Validators.required, Validators.pattern("^[0-9]*\.?[0-9]*$")]],
        callType: ['', [Validators.required]],
        callDesc: ['', [Validators.required]],
        callSolution: ['', [Validators.required]]
      })
  
    }

    addCallLogForm(){
      if(this.callForm.valid) {
        this.callLog = {
          callLogId: this.uuid,
          csrId: this.csrId,
          clientId: this.tRequest.clientId,
          requestId: this.tRequest.techRequestId,
          callDate: this.callForm.value.callDate,
          callTime: this.callForm.value.callTime,
          callType: this.callForm.value.callType,
          callDesc: this.callForm.value.callDesc,
          callSolution: this.callForm.value.callSolution
        }
    
        this.tService.addCallLog(this.callLog).subscribe({
          next:(res:any) => {
            this.message = "Call Log successfully Added!";
            this.snackBar.validSnackBar(this.message, 'Close');
            this.dialogref.close("Added")
          }, 
          error: (err:any) => {
            this.message = "Call Log could not be saved";
            this.snackBar.invalidSnackBar(this.message, 'Try Again');
            console.log(err);;
          }
        })
      }else {
        this.message = "Please fill out the form accordingly";
        this.snackBar.invalidSnackBar(this.message, 'Try Again');
      }
    }
  

}