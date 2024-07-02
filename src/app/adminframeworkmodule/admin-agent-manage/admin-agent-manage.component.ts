import { Component, ViewChild } from '@angular/core';
import { AgentmanageserviceService } from './agentmanageservice.service';
import { AddupdateAgentDialogComponent } from './addupdate-agent-dialog/addupdate-agent-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { Agent} from './agentModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';



@Component({
  selector: 'app-admin-agent-manage',
  templateUrl: './admin-agent-manage.component.html',
  styleUrls: ['./admin-agent-manage.component.css']
})

export class AdminAgentManageComponent {

  dataTable!:MatTableDataSource<any>;
  displayedColumns: string[] = [];
  agents: Array<any>;
  message: string = "";

  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  obs!:Observable<any>

  constructor(private http: AgentmanageserviceService,private matdialog: MatDialog, private snackBar: SnackbarService) {
    this.http.fetchAgents();
    this.agents = [];
  }

  ngOnInit(): void {
    this.loadAgents();
    this.displayedColumns = ['userName', 'firstName', 'lastName', 'email', 'update', 'delete'];
  }

  loadAgents() {
    this.http.getAllAgents().subscribe({
      next:(res: any) =>{
        this.agents = res.filter((a:any) => a.agentId !== null);

        this.dataTable = new MatTableDataSource<any>(this.agents);
        this.dataTable.paginator = this.paginator;
        this.obs = this.dataTable.connect();
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }

  updateAgent(agent: Agent){
    this.matdialog.open(UpdateDialogComponent, {
      width:'80%',
      height:'80%',
      data:{agentDetails: agent}
    })
  }

  openAddDialog() {
    this.matdialog.open(AddupdateAgentDialogComponent, {
      width:'80%',
      height:'80%'
    }).afterClosed()
    .subscribe(res=>{
      if(res==="Added"){
        location.reload();
        this.loadAgents();
      }
    })
  }

  deleteAgent(id: any) {
    this.http.deleteAgent(id).subscribe({
      next:(res:any)=>{
        this.message = "Agent Succesfully Deleted";
        this.snackBar.validSnackBar(this.message, 'Close');
      },
      error:(err:any)=>{
        this.message = "Agent could not be Deleted"
        this.snackBar.invalidSnackBar(this.message, 'Try Again');
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }
}
