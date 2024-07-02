import { Component, ViewChild, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EquipmentInventory } from '../model/equipmentinventory';
import { EquipmentManagementServiceService } from '../services/equipment-management-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEquipDialogComponent } from '../update-equip-dialog/update-equip-dialog.component';
import { AddEquipDialogComponent } from '../add-equip-dialog/add-equip-dialog.component';
import { EquipmentRequest } from '../model/equipmentrequest';
import { SnackbarService } from 'src/app/services/snackbar.service';


@Component({
  selector: 'app-equipment-management-dashboard',
  templateUrl: './equipment-management-dashboard.component.html',
  styleUrls: ['./equipment-management-dashboard.component.css']
})

export class EquipmentManagementDashboardComponent implements OnInit{
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = [];
  selected:string ='';
  equipmentlist!: EquipmentInventory[];
  equipmentrequestlist!: EquipmentRequest[];
  message: string = "";
  @ViewChild(MatPaginator) paginator!:MatPaginator;


constructor(private eservice:EquipmentManagementServiceService, private matdialog:MatDialog, private snackBar: SnackbarService){
  this.eservice.fetchEquipmentRequests();
  this.eservice.fetchEquipments();
}


ngOnInit(){
  this.loadEquipmentList();
  this.displayedColumns = ['Model', 'Type', 'Price', 'Count', 'Update', 'Delete'];
  this.selected = "None";
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


loadEquipmentList(){
  this.eservice.getAllEquipmentRequests().subscribe({
    next:(res:any)=>{
      this.equipmentrequestlist = res;
    },
    error:(err:any)=>{
      console.log(err);
    }
  })

  this.eservice.getAllEquipments().subscribe({
    next:(res:any) =>{
      if(this.selected === "None"){
        this.equipmentlist = res.filter((ele:any)=> ele.equipmentType === "Mobile" || ele.equipmentType === "Internet");
      }else{
        this.equipmentlist = res.filter((ele:any) => ele.equipmentType === this.selected);
      }
      
      const usedequiplist = this.equipmentrequestlist.map(ele => ele.equipmentId);
      this.equipmentlist = this.equipmentlist.filter(ele=>!usedequiplist.includes(ele.equipmentId));

      const result = [...this.equipmentlist.reduce((mp, o)=> {
        const key = JSON.stringify([o.equipmentModel, o.equipmentType, o.equipmentPrice]);
        if(!mp.has(key)) mp.set(key, {...o,count: 0});
        mp.get(key).count++;
        return mp;
      }, new Map).values()];

      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    },
    error:(err:any)=>{
      console.log(err);
    }
  })

}



openSaveDialog(){
  this.matdialog.open(AddEquipDialogComponent, {
    width:'80%',
    height:'80%'
  }).afterClosed()
  .subscribe(res=>{
    if(res==="Added"){
      location.reload();
      this.ngOnInit();
    }
  })
}


deleteEquipment(id:any){
  this.eservice.deleteEquipment(id).subscribe({
    next:(res:any) =>{
      this.message = "Equipment successfully Deleted!";
      this.snackBar.validSnackBar(this.message, 'Close');
    },
    error:(err:any)=>{
      this.message = "Equipment could not be deleted";
      this.snackBar.invalidSnackBar(this.message, 'Try Again');
      console.log(err);
    }
  })
}


openUpdateDialog(equip:EquipmentInventory){
  this.matdialog.open(UpdateEquipDialogComponent, {
    width:'80%',
    height:'80%',
    data:{oldequip: equip}
  })
}

handleStatus(){
  this.loadEquipmentList();
}

}