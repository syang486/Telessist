import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentManagementDashboardComponent } from './equipment-management-dashboard.component';

describe('EquipmentManagementDashboardComponent', () => {
  let component: EquipmentManagementDashboardComponent;
  let fixture: ComponentFixture<EquipmentManagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentManagementDashboardComponent ],
      imports:[
        HttpClientModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTableModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(EquipmentManagementDashboardComponent);
  });

  it('should create', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have type drop down', () =>{
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#typeDropDown')).toBeTruthy();
  })

  it('should have equipment table', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#equipTable')).toBeTruthy();
  })

  it('should have delete column', ()=>{
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#deleteEquip')?.textContent).toContain('Delete One Equipment');
  })
});
