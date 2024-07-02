import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogRef } from '@angular/material/dialog';

import { EquipmentRequestDialogComponent } from './equipment-request-dialog.component';

describe('EquipmentRequestDialogComponent', () => {
  let component: EquipmentRequestDialogComponent;
  let fixture: ComponentFixture<EquipmentRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentRequestDialogComponent ],
      imports: [CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule],
        providers: [
          {provide: MatDialogRef, useValue: {}},
          {provide: MAT_DIALOG_DATA, useValue: []},
      ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    

    expect(component).toBeTruthy();
  });

  it(`Should display msg "Update Equipment Request"`,()=>{
    const dash = fixture.debugElement.nativeElement as HTMLElement;
    expect(dash.querySelector('h1')?.textContent).toContain('Update Equipment Request')
   });


   it(`Should display in dropdown "Update Equipment Request"`,()=>{
    const dash = fixture.debugElement.nativeElement as HTMLElement;
    expect(dash.querySelector('h1')?.textContent).toContain('Update Equipment Request')
   });
 
});
