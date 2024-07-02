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

import { EquipmentRequestComponent } from './equipment-request.component';

describe('EquipmentRequestComponent', () => {
  let component: EquipmentRequestComponent;
  let fixture: ComponentFixture<EquipmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentRequestComponent ],
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

    fixture = TestBed.createComponent(EquipmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have header', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#requestFormHeader')?.textContent).toContain("Equipment Request Form");
  })

  it('should have form', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#requestForm')).toBeTruthy();
  })

  it('should have submit button', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#submitBtn')).toBeTruthy();
  })

});
