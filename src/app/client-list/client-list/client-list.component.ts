import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Client } from '../model/client';
import { MyhttpTwoService } from '../services/myhttp-two.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit{
  
  searchText:string = "";
  clients:Client[] = [];
  neededClientInfo: any[] = [];
  dataTable!:MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  obs!:Observable<any>

  constructor(private http:MyhttpTwoService) {
    this.http.fetchClients();
  }

  ngOnInit(): void {
    this.loadClients();
  }
  
  loadClients() {
    this.http.getClients().subscribe({
      next:(res:any) =>{
        this.clients = res.filter((c:any) => c.clientId !== null);
        this.dataTable = new MatTableDataSource<any>(this.clients);
        this.dataTable.paginator = this.paginator;
        this.obs = this.dataTable.connect();
      },
      error:(err:any) => {
        console.log(err);
      }
    })
  }
}
