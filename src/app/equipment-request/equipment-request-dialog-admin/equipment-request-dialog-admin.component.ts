import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { EquipmentRequest } from '../model/equipment-request.model';
import { EquipmentrequestservService } from '../services/equipmentrequestserv.service';
import { ngxCsv } from 'ngx-csv';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-equipment-request-dialog-admin',
  templateUrl: './equipment-request-dialog-admin.component.html',
  styleUrls: ['./equipment-request-dialog-admin.component.css']
})
export class EquipmentRequestDialogAdminComponent implements OnInit{
 
  equipmentRequestTable!:MatTableDataSource<any>;
  displayedColumns: string[] = [];
  filteredRequests: EquipmentRequest[] = [];
  tempER: String = '';
  obs!:Observable<any>
  data:any;
  searchText:String = "";

  @ViewChild(MatPaginator)
  paginator !:MatPaginator;

  constructor(private erService: EquipmentrequestservService, private dialog: MatDialog, private datePipe: DatePipe){
    this.filteredRequests = [];
  }


  ngOnInit(): void {
    this.loadEquipmentRequests();
    console.log(this.loadEquipmentRequests())
    this.tempER="None";
    this.displayedColumns = [ 'equipmentId', 'csrId','clientId', 'dateOfEquipRequest', 'equipRequestStatus'];
  }


  loadEquipmentRequests() {
    this.erService.getAllEquipmentRequests().subscribe({
      next:(res:any) => {
        if(this.tempER === 'None'){
          this.filteredRequests = res.filter((e:any) => e.equipRequestStatus === "Pending" || e.equipRequestStatus === "Active" || e.equipRequestStatus === "Inactive");
        }
        else{
          this.filteredRequests = res.filter((e:any)=> e.equipRequestStatus === this.tempER);
          
        }
        this.data = this.filteredRequests;
        this.equipmentRequestTable = new MatTableDataSource<any>(this.filteredRequests);
        this.equipmentRequestTable.paginator = this.paginator;
        this.obs = this.equipmentRequestTable.connect();
      },
      error:(err:any)=>{
        console.log(err)
      }

    })
  }

  filterStatus() {
    this.loadEquipmentRequests();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.equipmentRequestTable.filter = filterValue.trim().toLowerCase();
  }

  applyDateStatusFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.equipmentRequestTable
  }

  exportCsv() {
    let options = {
      title: "equipmentRequestLog",
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers:['equipmentId','clientId','csrId', 'dateOfEquipRequest', 'equipRequestDesc', 'equipRequestStatus']
    }
    new ngxCsv(this.data, "equipment request report", options);
  }

  date(date: any){
    return this.datePipe.transform(date, "MM/dd/yyyy, hh:mm a");
  }

}
