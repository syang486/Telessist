import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentInventory } from '../model/equipmentinventory';
import { EquipmentManagementServiceService } from '../services/equipment-management-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-update-equip-dialog',
  templateUrl: './update-equip-dialog.component.html',
  styleUrls: ['./update-equip-dialog.component.css']
})
export class UpdateEquipDialogComponent {
  
  equip : EquipmentInventory = new EquipmentInventory();
  updateForm: FormGroup;
  msg:string="";
  types:string[] = [];


  constructor(private builder:FormBuilder, private dialogref:MatDialogRef<UpdateEquipDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any,
    private eservice:EquipmentManagementServiceService, private snackBar: SnackbarService) {
    this.equip = data.oldequip;
    this.updateForm = this.builder.group({
      equipmentId:[this.equip.equipmentId],
      equipmentModel:[this.equip.equipmentModel,[Validators.required]],
      equipmentType:[this.equip.equipmentType,[Validators.required]],
      equipmentPrice:[this.equip.equipmentPrice,[Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"), Validators.min(0)]]
    })

    this.types = ['Mobile', 'Internet']
  }

  updateEquipment(){
    if(this.updateForm.valid){
      this.eservice.updateEquipment(this.updateForm.value).subscribe({
        next:(res:any)=>{
          this.msg = "Equipment has been updated!";
          this.snackBar.validSnackBar(this.msg, 'Close');
          this.dialogref.close("Updated");
        },
        error:(err:any)=>{
          this.msg = "Equipment was not updated";
          this.snackBar.invalidSnackBar(this.msg, 'Try Again');
          console.log(err);
        }
      })
    }
    else{
      this.msg = "Please update the form with all fields!";
      this.snackBar.invalidSnackBar(this.msg, 'Try Again');
    }
  }
}
