import { Component, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback';
import { FeedbackhttpService } from '../service/feedbackhttp.service';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css']
})
export class AdminFeedbackComponent {
  feedbacks:Feedback[] = [];
  searchDate: any;
  dataTable!:MatTableDataSource<any>;
  searchText?: string = undefined;
  
  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  obs!:Observable<any>

  @ViewChild('pick', {
    read: MatInput
  }) pick: any;

  constructor(private http: FeedbackhttpService) {
  }

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback() {
      this.http.getAllFeedback().subscribe({
        next:(res:any) => {
          this.feedbacks = res;
          this.dataTable = new MatTableDataSource<any>(this.feedbacks);
          this.dataTable.paginator = this.paginator;
          this.obs = this.dataTable.connect();
          console.log(this.feedbacks);
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
    this.searchText = "";
  }
}
