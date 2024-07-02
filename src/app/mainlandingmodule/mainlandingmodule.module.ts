import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainlandingmoduleRoutingModule } from './mainlandingmodule-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import { MainLandingPageComponent } from './main-landing-page/main-landing-page.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MainlandingmoduleRoutingModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule
  ]
})
export class MainlandingmoduleModule { }
