import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { GeneralServicesComponent } from './general-services.component'; 
import { PromotionComponent } from '../promotion/promotion.component';
import { GeneralServicesServiceService } from '../services/general-services-service.service';


describe('GeneralServicesComponent', () => {
  let component: GeneralServicesComponent;
  let fixture: ComponentFixture<GeneralServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralServicesComponent ],
      imports:[
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        HttpClientModule,
        MatTableModule,
        MatDialogModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(GeneralServicesComponent); 
  });


  it('should create', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have generalservices table', () =>{
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#genServTable')).toBeTruthy();
  })

  it('should have edit column', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#editHead')?.textContent).toContain('Edit');
  })

  it('should have delete column', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#deleteHead')?.textContent).toContain('Delete');
  })
});
