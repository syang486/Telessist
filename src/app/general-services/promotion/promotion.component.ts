import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralServices } from '../models/general-services';
import { Promotion } from '../models/promotion';
import { GeneralServicesServiceService } from '../services/general-services-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent {
  generalService : GeneralServices = new GeneralServices();
  promotion : Promotion = new Promotion();
  updateForm : FormGroup;
  addPromoForm: FormGroup;
  genServ: GeneralServices = new GeneralServices();
  message:string="";
  displayedColumns: string[] =[];
  promoList: Promotion[] = [];
  promotions: Promotion[] = [];
  searchText: string="";
  dataTable : any;
  genServList : GeneralServices[] =[];

  constructor(private genServServices: GeneralServicesServiceService, private builder:FormBuilder, private http:GeneralServicesServiceService, private dialogref: MatDialogRef<PromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private snackBar:SnackbarService) {
      this.genServ = data.serviceDetails;
      this.updateForm = this.builder.group({
        serviceId: [this.genServ.serviceId],
        serviceName: [this.genServ.serviceName],
        monthlyPrice: [this.genServ.monthlyPrice],
        location: [this.genServ.location],
        promotion : [this.genServ.promotion]})
      
        this.addPromoForm = this.builder.group({
        promoId: ['',[Validators.required]],
        promoName: ['',[Validators.required]],
        discount: ['',[Validators.required]],
        promoDesc: ['',[Validators.required]],
        region: ['',[Validators.required]],
        promoExpiryDate: ['',[Validators.required]]
      })
      
    }

    ngOnInit(){
      // this.getGeneralService();
      this.showAllPromotions();
      this.displayedColumns = ['promoId', 'promoName', 'discount', 'promoDesc', 'region', 'promoExpiryDate', 'delete']
    }
  // getGeneralService(){
  //   this.http.getGeneralService(this.genServ.serviceId).subscribe( (genserv) => {
  //     this.generalService = genserv;
  //   })
  // }
  // showAllGeneralServices(){
  //   this.genServServices.viewAllGeneralServices().subscribe({
  //     next:(res:any)=>{
  //       this.genServList = res.filter((g:any) => g.serviceId !== null);
  //     },
  //     error:(err:any)=>{
  //       console.log(err);
  //     }
  //   });
  // }
  showAllPromotions(){
    this.genServServices.viewAllPromotion(this.genServ.serviceId).subscribe((promo) => {
      if(this.promoList.length !== 0){
        this.promoList = promo.filter((p) => p.promoId !== null);
      }
      else{
        this.promoList = promo;
      }
      this.dataTable = new MatTableDataSource(this.promoList);
    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
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

  addPromotion(){
    if(this.addPromoForm.valid){
      this.http.addPromotion(this.genServ.serviceId, this.addPromoForm.value).subscribe({
        next:(res:any)=>{
          this.message="Promotion has been added";
          this.dialogref.close("Added");
          this.snackBar.validSnackBar(this.message, 'Close');
        },
        error:(err:any)=>{
          this.message="Promotion could not be added."
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

  deletePromotion(promoId: string){
    console.log(this.genServ.serviceId);
    console.log(promoId);
    this.http.deletePromotion(this.genServ.serviceId, promoId).subscribe({
      next: (res:any) =>{
        // this.promoList = this.promoList.filter(p => p.promoId !== promoId);
        this.message="Promotion has been deleted";
        this.snackBar.validSnackBar(this.message, 'Close');
        this.showAllPromotions();
      },
      error: (err:any) => {
        this.message="Promotion could not be deleted."
        this.snackBar.invalidSnackBar(this.message, 'Try Again');
        console.log(err);
      }
    });
  }
}
