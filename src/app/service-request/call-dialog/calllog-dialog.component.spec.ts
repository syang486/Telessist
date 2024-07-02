import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceRequestComponent } from '../service-request/service-request.component';

import { CalllogDialogComponent } from './calllog-dialog.component';

describe('CalllogDialogComponent', () => {
  let fixture: ComponentFixture<CalllogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalllogDialogComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalllogDialogComponent);
  });

  it('should create', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it('should have update form', () => {
  //   fixture.detectChanges();
  //   const app = fixture.debugElement.nativeElement as HTMLElement;
  //   expect(app.querySelector('#callLogForm')).toBeTruthy();
  // })

  // it('should have header', () => {
  //   fixture.detectChanges();
  //   const app = fixture.debugElement.nativeElement as HTMLElement;
  //   expect(app.querySelector('#callLogHeader')?.textContent).toContain('Call Log');
  // })
});
