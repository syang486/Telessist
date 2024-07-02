import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralServices } from '../models/general-services';
import { PromotionAgentComponent } from '../promotion-agent/promotion-agent.component';
import { PromotionComponent } from '../promotion/promotion.component';
import { GeneralServicesServiceService } from '../services/general-services-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-general-service',
  templateUrl: './add-general-service.component.html',
  styleUrls: ['./add-general-service.component.css']
})
export class AddGeneralServiceComponent {
  addServiceForm:FormGroup;
  genServ: GeneralServices;
  message: string = '';
  
  constructor(private http: GeneralServicesServiceService, private builder: FormBuilder, private dialogref: MatDialogRef<PromotionAgentComponent>,
    private snackBar: SnackbarService){
    this.addServiceForm = this.builder.group({
      serviceId: ['',[Validators.required]],
      serviceName: ['', [Validators.required]],
      monthlyPrice: ['', [Validators.required]],
      location: ['', [Validators.required]],
    })
    this.genServ = new GeneralServices();
  }

  addGeneralService(){
    if(this.addServiceForm.valid){
      this.http.addGeneralService(this.addServiceForm.value).subscribe({
        next:(res:any) => {
          this.message = "General Service Successfully Added"
          this.dialogref.close("Service Added");
          this.snackBar.validSnackBar(this.message, 'Close');
        },
        error:(err:any)=>{
          this.message="General service could not be added. Check Id."
          this.snackBar.invalidSnackBar(this.message, 'Try Again');
          console.log(err);
        }
      })
    }
    else{
      this.message = "Please update the form with all fields!"
      this.snackBar.invalidSnackBar(this.message, 'Try Again');
    }
    this.addServiceForm.reset();
  }
}
