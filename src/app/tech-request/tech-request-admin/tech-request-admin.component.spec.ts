// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { TechRequestAgentComponent } from './tech-request-agent.component';

// describe('TechRequestAgentComponent', () => {
//   let component: TechRequestAgentComponent;
//   let fixture: ComponentFixture<TechRequestAgentComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ TechRequestAgentComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(TechRequestAgentComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { TechrequestService } from '../techrequest.service';
import { AgentUpdateTechRequestComponent } from '../agent-update-tech-request/agent-update-tech-request.component';
import { AgentUpdateTechnicianComponent } from '../agent-update-technician/agent-update-technician.component';
import { CalllogDialogComponent } from '../calllog-dialog/calllog-dialog.component';
import { techRequest } from '../model/techRequest';
import { Technician } from '../model/technician';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TechRequestAdminComponent } from './tech-request-admin.component';


// describe('TechRequestAgentComponent', () => {
//   let component: TechRequestAgentComponent;
//   let fixture: ComponentFixture<TechRequestAgentComponent>;
//   let mockTechRequestService: jasmine.SpyObj<TechrequestService>;
//   let mockDialog: jasmine.SpyObj<MatDialog>;
describe('TechRequestAdminComponent', () => {
  let component: TechRequestAdminComponent;
  let fixture: ComponentFixture<TechRequestAdminComponent>;

  beforeEach(async () => {
    // mockTechRequestService = jasmine.createSpyObj('TechrequestService', ['viewAllTechRequests', 'deleteTechRequest', 'removeTechnicianFromRequest']);
    // mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ TechRequestAdminComponent ],
      imports:[
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatDialogModule

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechRequestAdminComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechRequestAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have status drop down', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#statusDropDown')).toBeTruthy();
  })
  it('should have request table', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#requestTable')).toBeTruthy();
  })

  it('should have assign column', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#assignHeader')?.textContent).toContain('Technician');
  })

  })

