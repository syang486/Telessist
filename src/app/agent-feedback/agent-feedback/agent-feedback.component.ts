import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback';
import { FeedbackhttpService } from '../service/feedbackhttp.service';

@Component({
  selector: 'app-agent-feedback',
  templateUrl: './agent-feedback.component.html',
  styleUrls: ['./agent-feedback.component.css']
})
export class AgentFeedbackComponent implements OnInit{
  agentId:any;
  feedbacks:Feedback[] = [];
  searchDate: any;
  dataTable!:MatTableDataSource<any>;
  
  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  obs!:Observable<any>

  @ViewChild('pick', {
    read: MatInput
  }) pick: any;

  constructor(private http: FeedbackhttpService) {
    this.agentId = sessionStorage.getItem("csrId");
  }

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback() {
    this.http.getFeedbackByAgentId(this.agentId).subscribe({
      next:(res:any) => {
        this.feedbacks = res; 
        this.dataTable = new MatTableDataSource<any>(this.feedbacks);
        this.dataTable.paginator = this.paginator;
        this.obs = this.dataTable.connect();
      }, 
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  OnDateChange(event: any) {
    this.searchDate = event;
  }

  resetDate() {
    this.pick.value = "";
    this.searchDate = this.pick.value;
  }
}
