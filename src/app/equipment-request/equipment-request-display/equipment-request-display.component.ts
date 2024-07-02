import { Component, OnInit, ViewChild } from '@angular/core';
import { EquipmentrequestservService } from '../services/equipmentrequestserv.service';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentRequest } from '../model/equipment-request.model';
import { EquipmentRequestDialogComponent } from '../equipment-request-dialog/equipment-request-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CallDialogComponent } from '../call-dialog/call-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { SnackbarService } from '../services/snackbar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-equipment-request-display',
  templateUrl: './equipment-request-display.component.html',
  styleUrls: ['./equipment-request-display.component.css']
})
export class EquipmentRequestDisplayComponent implements OnInit{

  equipmentRequestTable!:MatTableDataSource<any>;
  displayedColumns: string[] = [];
  filteredRequests: EquipmentRequest[] = [];
  tempER: String = '';
  obs!:Observable<any>
  message:string = "";

  searchText:String = "";

  @ViewChild(MatPaginator)
  paginator !:MatPaginator;


  constructor(private erService: EquipmentrequestservService, private dialog: MatDialog, private snackBar: SnackbarService, private datePipe: DatePipe){
    this.filteredRequests = [];
  }



  ngOnInit(): void {
    this.loadEquipmentRequests();
    console.log(this.loadEquipmentRequests())
    this.tempER="None";
    this.displayedColumns = ['equipmentId', 'clientId', 'dateOfEquipRequest', 'equipRequestStatus', 'resolve', 'delete', "callLog"];
   
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


  deleteEquipmentRequest(erId:any){
    this.erService.deleteEquipmentRequest(erId).subscribe({
      next:(res:any)=>{
        this.message="Equipment Request has been deleted!";
          this.snackBar.validSnackBar(this.message, 'Close');
      },
      error:(err:any)=>{
        this.message="Equipment Request could not be deleted."
        this.snackBar.invalidSnackBar(this.message, 'Try Again');
        console.log(err);
      }
    })
  }


    updatedEquipmentRequest(equipRequest: EquipmentRequest){
      this.dialog.open(EquipmentRequestDialogComponent, {
        width:'80%',
        height:'80%',
        data:{equipmentRequestDetails: equipRequest}
      })
    }


    addCallLog(equipRequest: EquipmentRequest) {
      this.dialog.open(CallDialogComponent, {
        width:'80%',
        height:'80%',
        data:{equipmentRequestDetails: equipRequest}
      })
    }
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.equipmentRequestTable.filter = filterValue.trim().toLowerCase();
    }

    date(date: any){
      return this.datePipe.transform(date, "MM/dd/yyyy, hh:mm a");
    }

}
