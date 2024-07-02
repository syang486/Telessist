import { Component } from '@angular/core';
import { MyhttpTwoService } from './client-list/services/myhttp-two.service';
import { MyhttpService } from './service-request/services/myhttp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tecloapp';
  isHome:boolean = true;
  
  constructor() {    
  }

  onLoginClick(){
    this.isHome =false;
  }
}
