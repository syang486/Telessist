import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './authenticationmodule/login/login.component';
import { RegisterComponent } from './authenticationmodule/register/register.component';
import { AdminAgentManageComponent } from './adminframeworkmodule/admin-agent-manage/admin-agent-manage.component';

//Angular Material
import {MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
//NG bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainLandingPageComponent } from './mainlandingmodule/main-landing-page/main-landing-page.component';
import { ClientFrameComponent } from './clientframeworkmodule/client-frame/client-frame.component';

import { AdminFrameComponent } from './adminframeworkmodule/admin-frame/admin-frame.component';
import { AgentFrameComponent } from './agentframeworkmodule/agent-frame/agent-frame.component';
import { ClientrequestComponent } from './adminframeworkmodule/clientrequest/clientrequest.component';
import { AdminDashboardComponent } from './adminframeworkmodule/admin-dashboard/admin-dashboard.component';

import { SnackbarComponent } from './snackbar/snackbar.component';
import { ServiceRequestComponent } from './service-request/service-request/service-request.component';
import { ServiceRequestAdminComponent } from './service-request/service-request-admin/service-request-admin.component';
import { ServiceDialogComponent } from './service-request/service-dialog/service-dialog.component';
import { CalllogDialogComponent } from './service-request/call-dialog/calllog-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { ClientListComponent } from './client-list/client-list/client-list.component';
import { ClientsearchPipe } from './client-list/pipe/clientsearch.pipe';
import { AgentClientListComponent } from './client-list/agent-client-list/agent-client-list.component';
import { AgentClientCardComponent } from './client-list/agent-client-card/agent-client-card.component';
import { ClientCardComponent } from './client-list/client-card/client-card.component';
import { AgentFeedbackComponent } from './agent-feedback/agent-feedback/agent-feedback.component';
import { AgentFeedbackSearchPipe } from './agent-feedback/feedbackpipe/agent-feedback-search.pipe';
import { AgentFeedbackCardComponent } from './agent-feedback/agent-feedback-card/agent-feedback-card.component';
import { AdminFeedbackComponent } from './agent-feedback/admin-feedback/admin-feedback.component';
import { AdminFeedbackSearchPipe } from './agent-feedback/feedbackpipe/admin-feedback-search.pipe';
import { ServiceRequestFormComponent } from './service-request-form/service-request-form/service-request-form.component';
import { AdminCreateTechnicianComponent } from './tech-request/admin-create-technician/admin-create-technician.component';
import { TechRequestComponent } from './tech-request/tech-request/tech-request.component';
import { AgentUpdateTechRequestComponent } from './tech-request/agent-update-tech-request/agent-update-tech-request.component';
import { TechRequestAgentComponent } from './tech-request/tech-request-agent/tech-request-agent.component';
import { AgentUpdateTechnicianComponent } from './tech-request/agent-update-technician/agent-update-technician.component';
import { TechRequestAdminComponent } from './tech-request/tech-request-admin/tech-request-admin.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TechCalllogDialogComponent } from './tech-request/tech-calllog-dialog/tech-calllog-dialog.component';
import { TodolistComponent } from './todolist/todolist/todolist.component';
import { EquipmentRequestComponent } from './equipment-request/equipment-request/equipment-request.component';
import { EquipmentRequestDisplayComponent } from './equipment-request/equipment-request-display/equipment-request-display.component';
import { EquipmentRequestDialogComponent } from './equipment-request/equipment-request-dialog/equipment-request-dialog.component';
import { EquipmentRequestDialogAdminComponent } from './equipment-request/equipment-request-dialog-admin/equipment-request-dialog-admin.component';
import { CallDialogComponent } from './equipment-request/call-dialog/call-dialog.component';
import { CallLogListComponent } from './call-log-list-module/call-log-list/call-log-list.component';
import { CallLogListDialogComponent } from './call-log-list-module/call-log-list-dialog/call-log-list-dialog.component';
import { CallLogListAdminComponent } from './call-log-list-module/call-log-list-admin/call-log-list-admin.component';
import { EquipmentInventoryViewOnlyComponent } from './equipment-management-dashboard/equipment-inventory-view-only/equipment-inventory-view-only.component';
import { UpdateEquipDialogComponent } from './equipment-management-dashboard/update-equip-dialog/update-equip-dialog.component';
import { EquipmentManagementDashboardComponent } from './equipment-management-dashboard/equipment-management-dashboard/equipment-management-dashboard.component';
import { AddEquipDialogComponent } from './equipment-management-dashboard/add-equip-dialog/add-equip-dialog.component';
import { CallStatsAgentViewComponent } from './agent-call-stats/call-stats-agent-view/call-stats-agent-view.component';
import { CallStatsAdminViewComponent } from './agent-call-stats/call-stats-admin-view/call-stats-admin-view.component';
import { AddupdateAgentDialogComponent } from './adminframeworkmodule/admin-agent-manage/addupdate-agent-dialog/addupdate-agent-dialog.component';
import { ClientDashboardComponent } from './clientframeworkmodule/client-dashboard/client-dashboard.component';

//NGX Charts
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { GeneralServicesComponent } from './general-services/general-services/general-services.component';
import { PromotionAgentComponent } from './general-services/promotion-agent/promotion-agent.component';
import { PromotionComponent } from './general-services/promotion/promotion.component';
import { AddGeneralServiceComponent } from './general-services/add-general-service/add-general-service.component';
import { GeneralServicesAgentComponent } from './general-services/general-services-agent/general-services-agent.component';
import { AgentClientrequestComponent } from './agentframeworkmodule/agent-clientrequest/agent-clientrequest.component';
import { UpdateDialogComponent } from './adminframeworkmodule/admin-agent-manage/update-dialog/update-dialog.component';
import { AgentDashboardComponent } from './agentframeworkmodule/agent-dashboard/agent-dashboard.component';

@NgModule({
  declarations: [
    MainLandingPageComponent,
    ClientFrameComponent,
    AdminFrameComponent,
    AgentFrameComponent,
    AdminDashboardComponent,
    ClientrequestComponent,
    LoginComponent,
    RegisterComponent,
    SnackbarComponent,
    ServiceRequestComponent,
    ServiceDialogComponent,
    CalllogDialogComponent,
    ServiceRequestAdminComponent,
    AppComponent,
    ClientListComponent,
    ClientCardComponent,
    ClientsearchPipe,
    AgentClientCardComponent,
    AgentClientListComponent,
    AgentFeedbackComponent,
    AgentFeedbackCardComponent,
    AgentFeedbackSearchPipe,
    AdminFeedbackComponent,
    AdminFeedbackSearchPipe,
    ServiceRequestFormComponent,
    TechRequestComponent,
    TechRequestAgentComponent,
    AgentUpdateTechRequestComponent,
    AgentUpdateTechnicianComponent,
    TechCalllogDialogComponent,
    TechRequestAdminComponent,
    AdminCreateTechnicianComponent,
    TodolistComponent,
    EquipmentRequestComponent,
    EquipmentRequestDisplayComponent,
    EquipmentRequestDialogComponent,
    CallDialogComponent,
    EquipmentRequestDialogAdminComponent,
    CallLogListComponent,
    CallLogListAdminComponent,
    CallLogListDialogComponent,
    EquipmentManagementDashboardComponent,
    UpdateEquipDialogComponent,
    AddEquipDialogComponent,
    EquipmentInventoryViewOnlyComponent,
    CallStatsAgentViewComponent,
    CallStatsAdminViewComponent,
    GeneralServicesComponent,
    PromotionComponent,
    AddGeneralServiceComponent,
    GeneralServicesAgentComponent,
    PromotionAgentComponent,
    AgentClientrequestComponent,
    AdminAgentManageComponent,
    AddupdateAgentDialogComponent, 
    UpdateDialogComponent,
    AgentDashboardComponent,
    ClientDashboardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,

    MatSlideToggleModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSliderModule, 
    MatTabsModule,
    MatIconModule,    
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatOptionModule,
  
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule,

    NgxChartsModule
  ],
  providers: [
    DatePipe,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
