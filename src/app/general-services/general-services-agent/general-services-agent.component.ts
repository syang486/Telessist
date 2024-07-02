import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralServices } from '../models/general-services';
import { PromotionAgentComponent } from '../promotion-agent/promotion-agent.component';
import { PromotionComponent } from '../promotion/promotion.component';
import { GeneralServicesServiceService } from '../services/general-services-service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-general-services-agent',
  templateUrl: './general-services-agent.component.html',
  styleUrls: ['./general-services-agent.component.css']
})
export class GeneralServicesAgentComponent {
  
  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  obs!:Observable<any>

  
  displayedColumns: string[] =[];
  genServList: GeneralServices[] = [];
  genServs: GeneralServices[] = [];
  searchText: string="";
  dataTable : any;


  constructor(private genServServices: GeneralServicesServiceService, private dialog: MatDialog, private snackBar: SnackbarService){
    this.genServServices.fetchGeneralServices();
  }

  ngOnInit() : void{
    this.showAllGeneralServices();
    this.displayedColumns = ['serviceId', 'serviceName', 'monthlyPrice', 'location', 'promotions'];
    // this.showAllPromotion(this.serviceId);
    // this.deleteGeneralService(this.serviceId);
  }

  showAllGeneralServices(){
    this.genServServices.viewAllGeneralServices().subscribe( (genservs) => {
      console.log(this.genServList);
      this.genServList = genservs;
      this.dataTable = new MatTableDataSource(this.genServList);
      this.dataTable.paginator = this.paginator;
      this.obs = this.dataTable.connect();
    });
  }
  
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }
  updateGeneralService(genServ: GeneralServices){
    this.dialog.open(PromotionAgentComponent, {
      width: '80%',
      height: '80%',
      data: {serviceDetails : genServ}
    })
  }
  
}
