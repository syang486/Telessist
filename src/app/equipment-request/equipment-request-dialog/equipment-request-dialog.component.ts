import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentRequest } from '../model/equipment-request.model';
import { EquipmentrequestservService } from '../services/equipmentrequestserv.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-equipment-request-dialog',
  templateUrl: './equipment-request-dialog.component.html',
  styleUrls: ['./equipment-request-dialog.component.css']
})
export class EquipmentRequestDialogComponent {

  equipRequest: EquipmentRequest = new EquipmentRequest();
  updatedForm: FormGroup;
  erStatus: string[] = [];
  csrId:any = sessionStorage.getItem("csrId");
  msg: string ='';
  equipmentRequestId: FormControl = new FormControl();
  clientId: FormControl = new FormControl();
  equipmentId: FormControl = new FormControl();


  constructor(private erService: EquipmentrequestservService, private formBuilder: FormBuilder,private dialogref: MatDialogRef<EquipmentRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private snackBar: SnackbarService)
    {
      this.equipRequest = data.equipmentRequestDetails;

      this.updatedForm = this.formBuilder.group({
        equipmentRequestId:[this.equipRequest.equipmentRequestId],
        clientId: [this.equipRequest.clientId],
        equipmentId: [this.equipRequest.equipmentId],
        csrId: [this.equipRequest.csrId],
        dateOfEquipRequest: [this.equipRequest.dateOfEquipRequest],
        equipRequestDesc: [this.equipRequest.equipRequestDesc],
        equipRequestStatus: [this.equipRequest.equipRequestStatus]
      })

      this.erStatus = ['Pending','Active','Inactive'];
  }

  updateEquipmentRequest(){
    if(this.updatedForm.valid){
      this.erService.updateEquipmentRequest(this.updatedForm.value).subscribe({
        next:(res:any)=>{
          this.msg="Equipment Request has been updated!";
          this.dialogref.close("Updated");
          this.snackBar.validSnackBar(this.msg, 'Close');
        },
        error:(err:any)=>{
          this.msg="Equipment Request could not be updated."
          this.snackBar.invalidSnackBar(this.msg, 'Try Again');
          console.log(err);
        }
      })
    }
  }

}
