import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServiceRequestAdminComponent } from './service-request-admin.component';

describe('ServiceRequestAdminComponent', () => {
  let component: ServiceRequestAdminComponent;
  let fixture: ComponentFixture<ServiceRequestAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRequestAdminComponent ],
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

    fixture = TestBed.createComponent(ServiceRequestAdminComponent);
  });

  it('should create', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have status drop down', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#statusDropDown')).toBeTruthy();
  })

  it('should have request table', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#serviceTable')).toBeTruthy();
  })
});
