import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Technician } from '../model/technician';
import { techRequest } from '../model/techRequest';
import { TechrequestService } from '../techrequest.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AgentUpdateTechRequestComponent } from '../agent-update-tech-request/agent-update-tech-request.component';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { AgentUpdateTechnicianComponent } from '../agent-update-technician/agent-update-technician.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { TechCalllogDialogComponent } from '../tech-calllog-dialog/tech-calllog-dialog.component';
import { SnackbarService } from 'src/app/service-request/services/snackbar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tech-request-agent',
  templateUrl: './tech-request-agent.component.html',
  styleUrls: ['./tech-request-agent.component.css'],
  // encapsulation: ViewEncapsulation.None
})

export class TechRequestAgentComponent implements OnInit {
  techRequest: techRequest;
  techRequests : Array<techRequest> = [];
  techRequestTable : Array<techRequest> = [];
  dataSource = new MatTableDataSource(this.techRequestTable)
  // techRequests: Array<any>;
  // dataSource!: MatTableDataSource<any>;
  message: string = "";
  status: string = "";
  displayedColumns: string[] = [];
  searchText: string = "";
  technicians : Array<Technician> = [];
  selected:string = "";

  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  obs!:Observable<any>


  constructor(private tService: TechrequestService, private dialog: MatDialog, private snackBar: SnackbarService, private datePipe: DatePipe){
    this.techRequest = new techRequest();
    this.techRequests = [];
    
  }
  ngOnInit(): void {
    this.getAllTechRequests();
    this.displayedColumns = [ "clientId", "requestedDate", "status", "scheduledDate", "description", "technician", "action", "delete", 'callLog']
    this.selected = "None"; 
  }
  getAllTechRequests() {
    this.tService.viewAllTechRequests().subscribe(
      res => {
        if ( this.selected === "None"){
          this.techRequestTable = res;
        } else {
          this.techRequests = res.filter((t:any) => t.techRequestStatus.toUpperCase() === this.selected.toUpperCase());
          this.techRequestTable = this.techRequests;
        }
        this.dataSource = new MatTableDataSource(this.techRequestTable);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      }, err => {
        this.message = err;
        console.log(err);
      }
    )
  }

  updateTechRequest(techRequest: techRequest){
    console.log(techRequest);
    this.dialog.open(AgentUpdateTechRequestComponent, {
      width: '80%',
      height: '80%',
      data: {techDetails: techRequest}
    }).afterClosed().subscribe( res => { this.getAllTechRequests(); } )
  }

  deleteTechRequest(id: any){
    this.tService.deleteTechRequest(id).subscribe(
      res => {
        this.message = "Tech Request Succesfully Deleted";
        this.snackBar.validSnackBar(this.message, 'Close');
        this.getAllTechRequests();
      }, 
      err => {
        this.message = "Tech Request could not be Deleted";
        this.snackBar.invalidSnackBar(this.message, 'Try Again');
        console.log(err);
      }
    )
  }

  sortByStatus(){
    this.getAllTechRequests();
  }

  getAllTechnicians(techRequest: techRequest){
    this.dialog.open(AgentUpdateTechnicianComponent, {
      width: '80%',
      height: '80%',
      data: {techDetails: techRequest}
    }).afterClosed().subscribe( res => { this.getAllTechRequests(); } )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addCallLog(tRequest: techRequest) {
    this.dialog.open(TechCalllogDialogComponent, {
      width:'80%',
      height:'80%',
      data:{techDetails: tRequest}
    })
  }

  deleteTechnician(techRequest: techRequest){
    this.tService.removeTechnicianFromRequest(techRequest.techRequestId, techRequest.technician?.technicianId).subscribe(
      res => {
        console.log("here");
        this.message = "Technician Succesfully Deleted";
        this.snackBar.validSnackBar(this.message, 'Close');
        this.getAllTechRequests();
      }, 
      err => {
        this.message = "Technician could not be Deleted";
        this.snackBar.invalidSnackBar(this.message, 'Try Again');
        console.log(err);
      }
    )
  }

  date(date: any){
    return this.datePipe.transform(date, "MM/dd/yyyy, hh:mm a");
  }

  date2(date: any){
    return this.datePipe.transform(date, "MM/dd/yyyy");
  }

}
