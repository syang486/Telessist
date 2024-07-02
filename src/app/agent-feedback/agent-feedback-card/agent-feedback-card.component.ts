import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { Feedback } from '../model/feedback';
import { FeedbackhttpService } from '../service/feedbackhttp.service';

@Component({
  selector: 'app-agent-feedback-card',
  templateUrl: './agent-feedback-card.component.html',
  styleUrls: ['./agent-feedback-card.component.css']
})
export class AgentFeedbackCardComponent implements OnInit{
  
  @Input()
  indFeedback: Feedback = new Feedback();
  client: Client;
  rating!: any;
  roundedRate!:any;
  filled: number[] = [];
  empty:number[] = [];

  constructor(private http: FeedbackhttpService) {
    this.client = new Client();
  }

  ngOnInit(): void {
    this.loadClient();
    this.rating = this.indFeedback.rating;
    this.stars();
  }

  stars() {
    this.roundedRate = Math.round(this.rating);
    
    for(let i = 0; i < this.roundedRate; i++) {
      this.filled.push(1);
    }
  
    for(let i = 0; i < 5 - this.roundedRate; i++) {
      this.empty.push(1);
    }
  }

  loadClient() {
    this.http.getClientByClientId(this.indFeedback.clientId).subscribe({
      next:(res:any) => {
        this.client = res;
      }, 
      error: (err:any) => {
        console.log(err);
      }
    })
  }
}
