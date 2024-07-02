import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CallStatsAdminViewComponent } from './call-stats-admin-view.component';

describe('CallStatsAdminViewComponent', () => {
  let component: CallStatsAdminViewComponent;
  let fixture: ComponentFixture<CallStatsAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallStatsAdminViewComponent ],
      imports:[
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTableModule,
        HttpClientModule,
        FormsModule, 
        ReactiveFormsModule,
        MatDialogModule,
        MatNativeDateModule,
        MatInputModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallStatsAdminViewComponent);
  });

  it('should create', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have filter text box', ()=>{
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#filtertextbox')).toBeTruthy();
  })

  it('should have summary table', ()=>{
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#summaryTable')).toBeTruthy();
  })

  it('should have date picker', ()=>{
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#datepicker')).toBeTruthy();
  })
});
