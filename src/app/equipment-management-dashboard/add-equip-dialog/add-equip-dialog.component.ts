import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentInventory } from '../model/equipmentinventory';
import { EquipmentManagementServiceService } from '../services/equipment-management-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-equip-dialog',
  templateUrl: './add-equip-dialog.component.html',
  styleUrls: ['./add-equip-dialog.component.css']
})
export class AddEquipDialogComponent {

  addForm: FormGroup;
  msg:string="";
  types:string[] = [];


  constructor(private builder:FormBuilder, private dialogref:MatDialogRef<AddEquipDialogComponent>, private eservice:EquipmentManagementServiceService,
    private snackBar: SnackbarService) {
    this.addForm = this.builder.group({
      equipmentModel:['',[Validators.required]],
      equipmentType:['',[Validators.required]],
      equipmentPrice:[0.00,[Validators.required, Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"), Validators.min(0)]]
    })

    this.types = ['Mobile', 'Internet']
  }

  saveEquipment(){
    if(this.addForm.valid){
      this.eservice.saveEquipment(this.addForm.value).subscribe({
        next:(res:any)=>{
          this.msg = "Equipment has been added!";
          this.snackBar.validSnackBar(this.msg, 'Close');
          this.dialogref.close("Added");
        },
        error:(err:any)=>{
          this.msg = "Equipment was not updated";
          this.snackBar.invalidSnackBar(this.msg, 'Try Again');
          console.log(err);
        }
      })
    }
    else{
      this.msg = "Please fill the form with all fields!";
      this.snackBar.invalidSnackBar(this.msg, 'Try Again');
    }
  }
}
