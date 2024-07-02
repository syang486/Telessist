import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TechRequestComponent } from './tech-request.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
describe('ServiceRequestComponent', () => {
  let component: TechRequestComponent;
  let fixture: ComponentFixture<TechRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechRequestComponent ],
      imports:[
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        HttpClientModule,
        MatTableModule,
        MatDialogModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TechRequestComponent); 
  });

  it('should create', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should a form', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#form')).toBeTruthy();
  })

  // it('should have request table', () => {
  //   fixture.detectChanges();
  //   const app = fixture.debugElement.nativeElement as HTMLElement;
  //   expect(app.querySelector('#requestTable')).toBeTruthy();
  // })

  // it('should have delete column', () => {
  //   fixture.detectChanges();
  //   const app = fixture.debugElement.nativeElement as HTMLElement;
  //   expect(app.querySelector('#deleteHeader')?.textContent).toContain('Delete');
  // })
});
