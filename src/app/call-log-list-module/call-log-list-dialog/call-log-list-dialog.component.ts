import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/service-request/services/snackbar.service';
import { CallLog } from '../model/callLog';
import { CallLogServiceService } from '../services/call-log-service.service';

@Component({
  selector: 'app-call-log-list-dialog',
  templateUrl: './call-log-list-dialog.component.html',
  styleUrls: ['./call-log-list-dialog.component.css']
})
export class CallLogListDialogComponent {
  callLog: CallLog = new CallLog();
  updatedForm: FormGroup;
  callLogType: String[] = [];
  callLogDesc: String[] =[];
  msg: string = '';
  time: any;

  constructor(private clService: CallLogServiceService, private formBuilder: FormBuilder, private dialogref: MatDialogRef<CallLogListDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any, private snackBar: SnackbarService){
      this.callLog = data.callLogDetails;

      this.updatedForm = this.formBuilder.group({
        callLogId:[this.callLog.callLogId, [Validators.required]],
        csrId:[this.callLog.csrId, [Validators.required]],
        clientId:[this.callLog.clientId, [Validators.required]],
        requestId:[this.callLog.requestId, [Validators.required]],
        callDate:[this.callLog.callDate, [Validators.required]],
        callTime:['', [Validators.required]],
        callDesc:['', [Validators.required]],
        callType:['', [Validators.required]],
        callSolution:['', [Validators.required]]
      })

      this.updatedForm.patchValue({
        callTime: this.callLog.callTime,
        callDesc:this.callLog.callDesc,
        callType: this.callLog.callType,
        callSolution: this.callLog.callSolution
      })

      this.callLogType= ['Incoming', 'Outgoing']
      this.callLogDesc = ['Add Service', 'Remove Service', 'Send Equipment', 'Return Equipment', 'Schedule Technician', 'Cancel Technician', 'Others'];
    }


    updateCallLog() {
      if(this.updatedForm.valid){
        this.clService.updateCallLog(this.updatedForm.value).subscribe({
          next:(res:any)=>{
            this.msg="Call Log has been updated!";
            this.dialogref.close("Updated");
            this.snackBar.validSnackBar(this.msg, 'Close');
          },
          error:(err:any)=>{
            this.msg="Call Log could not be updated."
            this.snackBar.invalidSnackBar(this.msg, 'Try Again');
            console.log(err);
          }
  
        })
      }
    }
}
