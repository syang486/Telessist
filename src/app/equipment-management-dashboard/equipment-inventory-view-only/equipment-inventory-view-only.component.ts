import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EquipmentInventory } from '../model/equipmentinventory';
import { EquipmentManagementServiceService } from '../services/equipment-management-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEquipDialogComponent } from '../update-equip-dialog/update-equip-dialog.component';
import { AddEquipDialogComponent } from '../add-equip-dialog/add-equip-dialog.component';
import { EquipmentRequest } from '../model/equipmentrequest';


@Component({
  selector: 'app-equipment-inventory-view-only',
  templateUrl: './equipment-inventory-view-only.component.html',
  styleUrls: ['./equipment-inventory-view-only.component.css']
})
export class EquipmentInventoryViewOnlyComponent implements OnInit{
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = []
  selected:string ='';
  equipmentlist!: EquipmentInventory[];
  equipmentrequestlist!: EquipmentRequest[];
  @ViewChild(MatPaginator) paginator!:MatPaginator;


constructor(private eservice:EquipmentManagementServiceService, private matdialog: MatDialog){
  this.eservice.fetchEquipmentRequests();
  this.eservice.fetchEquipments();
}


ngOnInit(){
  this.loadEquipmentList();
  this.displayedColumns = ['Model', 'Type', 'Price', 'Count'];
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

      console.log(result);

      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    },
    error:(err:any)=>{
      console.log(err);
    }
  })

}

handleStatus(){
  this.loadEquipmentList();
}

}