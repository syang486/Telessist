import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralServices } from '../models/general-services';
import { Promotion } from '../models/promotion';
import { PromotionComponent } from '../promotion/promotion.component';
import { GeneralServicesServiceService } from '../services/general-services-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-promotion-agent',
  templateUrl: './promotion-agent.component.html',
  styleUrls: ['./promotion-agent.component.css']
})
export class PromotionAgentComponent {
  generalService : GeneralServices = new GeneralServices();
  promotion : Promotion = new Promotion();
  updateForm : FormGroup;
  addPromo: FormGroup;
  genServ: GeneralServices = new GeneralServices();
  message:string="";
  displayedColumns: string[] =[];
  promoList: Promotion[] = [];
  promotions: Promotion[] = [];
  searchText: string="";
  dataTable : any;

  constructor(private genServServices: GeneralServicesServiceService, private builder:FormBuilder, private http:GeneralServicesServiceService,private dialogref: MatDialogRef<PromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private snackBar: SnackbarService) {
      this.genServ = data.serviceDetails;
      this.updateForm = this.builder.group({
        serviceId: [this.genServ.serviceId],
        serviceName: [this.genServ.serviceName],
        monthlyPrice: [this.genServ.monthlyPrice],
        location: [this.genServ.location],
        promotion : [this.genServ.promotion]})
      
        this.addPromo = this.builder.group({
        promoId: [this.promotion.promoId],
        promoName: [this.promotion.promoName],
        discount: [this.promotion.discount],
        promoDesc: [this.promotion.promoDesc],
        region: [this.promotion.region],
        promoExpiryDate: [this.promotion.promoExpiryDate]
      })
      
    }

    ngOnInit(){
      this.getGeneralService();
      this.showAllPromotions();
      this.displayedColumns = ['promoId', 'promoName', 'discount', 'promoDesc', 'region', 'promoExpiryDate']
    }
  getGeneralService(){
    this.http.getGeneralService(this.genServ.serviceId).subscribe( (genserv) => {
      this.generalService = genserv;
    })
  }

  showAllPromotions(){
    this.genServServices.viewAllPromotion(this.genServ.serviceId).subscribe((promo) => {
      this.promoList = promo;
      this.dataTable = new MatTableDataSource(this.promoList);
    })
  }
  updateService(serviceId: string){
    if(this.updateForm.valid){
      this.http.updateGeneralService(this.updateForm.value, this.genServ.serviceId).subscribe({
        next:(res:any)=>{
          this.message="General Service has been updated";
          this.dialogref.close("Updated");
          this.snackBar.validSnackBar(this.message, 'Close');
        },
        error:(err:any)=>{
          this.message="General Service could not be updated."
          this.snackBar.invalidSnackBar(this.message, 'Try Again');
          console.log(err);
        }
      })
    }
    else{
      this.message = "Please fill the form with all fields!"
      this.snackBar.invalidSnackBar(this.message, 'Try Again');
    }
  }
 
}
