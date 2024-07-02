import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EquipmentRequestDisplayComponent } from './equipment-request-display.component';

describe('EquipmentRequestDisplayComponent', () => {
  let component: EquipmentRequestDisplayComponent;
  let fixture: ComponentFixture<EquipmentRequestDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentRequestDisplayComponent ],
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
        MatPaginatorModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentRequestDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a label with By Status', ()=>{
    const reg = fixture.debugElement.nativeElement as HTMLElement;
    expect(reg.querySelector('mat-label')?.textContent).toContain('By Status')

  })


  it('should have status drop down', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#statusDropDown')).toBeTruthy();
  })

  it('should have equipment request table', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#equipmentTable')).toBeTruthy();
  })



});
