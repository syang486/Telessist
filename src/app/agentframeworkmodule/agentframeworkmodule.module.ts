import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentframeworkmoduleRoutingModule } from './agentframeworkmodule-routing.module';
import { AgentFrameComponent } from './agent-frame/agent-frame.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';


@NgModule({
  declarations: [
  
    AgentDashboardComponent
  ],
  imports: [
    CommonModule,
    AgentframeworkmoduleRoutingModule
  ]
})
export class AgentframeworkmoduleModule { }
