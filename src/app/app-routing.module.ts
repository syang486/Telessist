import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authenticationmodule/login/login.component';
import { RegisterComponent } from './authenticationmodule/register/register.component';
import { MainLandingPageComponent } from './mainlandingmodule/main-landing-page/main-landing-page.component';
import { ClientFrameComponent } from './clientframeworkmodule/client-frame/client-frame.component';
import { AdminFrameComponent } from './adminframeworkmodule/admin-frame/admin-frame.component';
import { AgentFrameComponent } from './agentframeworkmodule/agent-frame/agent-frame.component';
import { AdminDashboardComponent } from './adminframeworkmodule/admin-dashboard/admin-dashboard.component';
import { ClientrequestComponent } from './adminframeworkmodule/clientrequest/clientrequest.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdmindashboardGuard } from './authenticationmodule/guards/admindashboard.guard';
import { ClientdashboardGuard } from './authenticationmodule/guards/clientdashboard.guard';
import { AgentdashboardGuard } from './authenticationmodule/guards/agentdashboard.guard';
import { AgentClientListComponent } from './client-list/agent-client-list/agent-client-list.component';
import { ClientListComponent } from './client-list/client-list/client-list.component';
import { AdminFeedbackComponent } from './agent-feedback/admin-feedback/admin-feedback.component';
import { AgentFeedbackComponent } from './agent-feedback/agent-feedback/agent-feedback.component';
import { ServiceRequestFormComponent } from './service-request-form/service-request-form/service-request-form.component';
import { TechRequestComponent } from './tech-request/tech-request/tech-request.component';
import { TodolistComponent } from './todolist/todolist/todolist.component';
import { EquipmentRequestComponent } from './equipment-request/equipment-request/equipment-request.component';
import { CallLogListComponent } from './call-log-list-module/call-log-list/call-log-list.component';
import { CallLogListAdminComponent } from './call-log-list-module/call-log-list-admin/call-log-list-admin.component';
import { EquipmentInventoryViewOnlyComponent } from './equipment-management-dashboard/equipment-inventory-view-only/equipment-inventory-view-only.component';
import { EquipmentManagementDashboardComponent } from './equipment-management-dashboard/equipment-management-dashboard/equipment-management-dashboard.component';
import { CallStatsAgentViewComponent } from './agent-call-stats/call-stats-agent-view/call-stats-agent-view.component';
import { CallStatsAdminViewComponent } from './agent-call-stats/call-stats-admin-view/call-stats-admin-view.component';
import { GeneralServicesAgentComponent } from './general-services/general-services-agent/general-services-agent.component';
import { GeneralServicesComponent } from './general-services/general-services/general-services.component';
import { AgentClientrequestComponent } from './agentframeworkmodule/agent-clientrequest/agent-clientrequest.component';
import { AdminAgentManageComponent } from './adminframeworkmodule/admin-agent-manage/admin-agent-manage.component';
import { AgentDashboardComponent } from './agentframeworkmodule/agent-dashboard/agent-dashboard.component';
import { ClientDashboardComponent } from './clientframeworkmodule/client-dashboard/client-dashboard.component';
import { ClientProfileComponent } from './clientframeworkmodule/client-profile/client-profile.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}

const routes: Routes = [
  {
    path: '',
    component: MainLandingPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'register',
    component: RegisterComponent
  },
  { 
    path: 'clientdash',
    component: ClientFrameComponent,
    canActivate:[ClientdashboardGuard], 
    children:[
      {
        path: 'clientprofile',
        component: ClientProfileComponent
      },
      {
        path: 'clientdashboard',
        component: ClientDashboardComponent
      },
      {
        path: 'clientservicerequest',
        component: ServiceRequestFormComponent
      },
      {
        path: 'clientequiprequest',
        component: EquipmentRequestComponent
      },
      {
        path: 'clienttechrequest',
        component: TechRequestComponent
      },
      {
        path: '',
        redirectTo: 'clientdashboard',
        pathMatch: 'full'
      }
    ]
  },
  { 
    path:'agentdash',
    component: AgentFrameComponent,
    canActivate:[AgentdashboardGuard],
    children: [
      { 
        path: 'agentdashboard',
        component: AgentDashboardComponent
      },
      {
        path: 'agentclientrequests',
        component: AgentClientrequestComponent
      },      
      {
        path: 'agentclientlist',
        component: AgentClientListComponent
      },
      {
        path: 'agentequipinv',
        component: EquipmentInventoryViewOnlyComponent
      },
      {
        path: 'agentgeneralservice',
        component: GeneralServicesAgentComponent
      },
      {
        path: 'agentcalllog',
        component: CallLogListComponent
      },
      {
        path: 'agentcallstat',
        component: CallStatsAgentViewComponent
      },
      {
        path: 'agenttodo',
        component: TodolistComponent
      },
      {
        path: 'agentfeedback',
        component: AgentFeedbackComponent
      },
      {
        path: '',
        redirectTo: 'agentdashboard',
        pathMatch: 'full'
      }
    ]
  }, 
  {
    path: 'admindash',
    component: AdminFrameComponent,
    canActivate:[AdmindashboardGuard], 
    children: [
      { 
        path: 'admindashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'adminclientrequests',
        component: ClientrequestComponent
      },
      {
        path: 'adminclientlist',
        component: ClientListComponent
      },
      { path: 'manageagent',
       component: AdminAgentManageComponent
      },
      {
        path: 'adminequipmngmt',
        component: EquipmentManagementDashboardComponent
      },
      {
        path: 'adminservicemngmt',
        component: GeneralServicesComponent
      },
      {
        path: 'admincalllog',
        component: CallLogListAdminComponent
      },
      {
        path: 'admincallstat',
        component: CallStatsAdminViewComponent
      },
      {
        path: 'adminfeedback',
        component: AdminFeedbackComponent
      },
      {
        path: '',
        redirectTo: 'admindashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8001'],
        disallowedRoutes: []
      }
    })
  ],

  exports: [RouterModule]

})
export class AppRoutingModule {


}
