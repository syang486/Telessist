import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientframeworkmoduleRoutingModule } from './clientframeworkmodule-routing.module';
import { ClientFrameComponent } from './client-frame/client-frame.component';
import { ClientframeworkmoduleComponent } from './clientframeworkmodule.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';

@NgModule({
  declarations: [
  
    ClientframeworkmoduleComponent,
       ClientDashboardComponent,
       ClientProfileComponent
  ],
  imports: [
    CommonModule,
    ClientframeworkmoduleRoutingModule
    ]
})
export class ClientframeworkmoduleModule { }
