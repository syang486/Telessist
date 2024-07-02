import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Technician } from '../model/technician';
import { techRequest } from '../model/techRequest';
import { TechrequestService } from '../techrequest.service';
import { TechnicianService } from '../technician.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-admin-create-technician',
  templateUrl: './admin-create-technician.component.html',
  styleUrls: ['./admin-create-technician.component.css']
})
export class AdminCreateTechnicianComponent {
  techRequest: techRequest = new techRequest();
  technician: Technician = new Technician();
  addForm: FormGroup;
  csrId: any = sessionStorage.getItem("csrId");
  statuses: String[] = [];
  message: string = "";
  constructor(private builder: FormBuilder, private tService: TechrequestService, private dialogref: MatDialogRef<AdminCreateTechnicianComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private technicianService: TechnicianService, private snackBar:SnackbarService){
      // this.techRequest = data.techDetails;
      this.addForm = this.builder.group({
        techFirstName:[this.technician.techFirstName],
        techLastName:[this.technician.techLastName],
        techAddress:[this.technician.techAddress],
        technicianId: [crypto.randomUUID()]
      })
      this.statuses = ["Pending", "Active", "Inactive"];
      
    }

  addTechnician() {
    if (this.addForm.valid){
      this.technicianService.saveTechnicians(this.addForm.value);
      this.message = "Technician added";
      this.dialogref.close("Added Technician");
      this.snackBar.validSnackBar(this.message, 'Close');
    } else {
      this.message = "Please fill ensure all values are entered."
    }
    
  }
}
