import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceRequest } from '../model/servicerequest';
import { MyhttpService } from '../services/myhttp.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})
export class ServiceDialogComponent {

  serviceRequest: ServiceRequest = new ServiceRequest();
  updateForm: FormGroup;
  csrId:any = sessionStorage.getItem("csrId");
  statuses: String[] = [];
  message:string = "";

  constructor(private builder:FormBuilder, private http:MyhttpService, private dialogref: MatDialogRef<ServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private snackBar:SnackbarService) {
      this.serviceRequest = data.serviceDetails;

      this.updateForm = this.builder.group({
        serviceRequestId:[this.serviceRequest.serviceRequestId],
        serviceId:[this.serviceRequest.serviceId],
        csrId:[this.csrId],
        clientId:[this.serviceRequest.clientId],
        dateOfServiceRequest:[this.serviceRequest.dateOfServiceRequest],
        serviceRequestDesc:[this.serviceRequest.serviceRequestDesc],
        serviceRequestStatus:['', [Validators.required]]
      })

      this.statuses = ['Pending', 'Active', 'Inactive']

      this.updateForm.patchValue({
        serviceRequestStatus: this.serviceRequest.serviceRequestStatus
      })
  }

  updateServiceRequest(){
    if(this.updateForm.valid) {
      this.http.updateServiceRequest(this.updateForm.value).subscribe({
        next:(res:any)=>{
          this.message="Service Request has been updated!";
          this.dialogref.close("Updated");
          this.snackBar.validSnackBar(this.message, 'Close');
        },
        error:(err:any)=>{
          this.message="Service Request could not be updated."
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
