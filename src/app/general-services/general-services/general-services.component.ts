import { Component, ViewChild } from '@angular/core';
import { GeneralServices } from '../models/general-services';
import { Promotion } from '../models/promotion';
import { GeneralServicesServiceService } from '../services/general-services-service.service';
import { RouterModule, Routes } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromotionComponent } from '../promotion/promotion.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddGeneralServiceComponent } from '../add-general-service/add-general-service.component';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';


@Component({
  selector: 'app-general-services',
  templateUrl: './general-services.component.html',
  styleUrls: ['./general-services.component.css']
})
export class GeneralServicesComponent {
  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  obs!:Observable<any>

 
  displayedColumns: string[] =[];
  genServList: GeneralServices[] = [];
  genServs: GeneralServices[] = [];
  searchText: string="";
  dataTable : any;
  message: string = '';

  constructor(private genServServices: GeneralServicesServiceService, private dialog: MatDialog, private snackBar: SnackbarService){
    this.genServServices.fetchGeneralServices();
  }

  ngOnInit() : void{
    this.showAllGeneralServices();
    this.displayedColumns = ['serviceId', 'serviceName', 'monthlyPrice', 'location', 'promotion', 'actions', 'delete'];
    // this.showAllPromotion(this.serviceId);
    // this.deleteGeneralService(this.serviceId);
  }

  showAllGeneralServices(){
    this.genServServices.viewAllGeneralServices().subscribe({
      next:(res:any)=>{
        this.genServList = res.filter((g:any) => g.serviceId !== null);
        this.dataTable = new MatTableDataSource(this.genServList);
        this.dataTable.paginator = this.paginator;
        this.obs = this.dataTable.connect();
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }

  addService(){
    this.dialog.open(AddGeneralServiceComponent, {
      width: '80%',
      height: '80%'
    }).afterClosed().subscribe(res=>{
      if(res=="Added"){
        location.reload();
        this.ngOnInit();
      }
    })
  }
  
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }
  

  deleteService(serviceId: any) {
    this.genServServices.deleteGeneralService(serviceId).subscribe({
      next:(res:any)=>{
        // const index = this.genServList.findIndex(gs => gs.serviceId === serviceId);
        // this.genServList.splice(index, 1);
        // this.dataTable = new MatTableDataSource(this.genServList);
        console.log("deleted");
        // this.showAllGeneralServices();
        this.message="Service Request has been deleted!";
        this.snackBar.validSnackBar(this.message, 'Close');
      },
      error:(err:any)=>{
        this.message="General Service could not be deleted."
        this.snackBar.invalidSnackBar(this.message, 'Try Again');
        console.log(err);
      }
    })
  }
  
  

  updateGeneralService(genServ: GeneralServices){
    this.dialog.open(PromotionComponent, {
      width: '80%',
      height: '80%',
      data: {serviceDetails : genServ}
    })
  }
}
