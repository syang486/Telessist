import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentInventoryViewOnlyComponent } from './equipment-inventory-view-only.component';

describe('EquipmentInventoryViewOnlyComponent', () => {
  let component: EquipmentInventoryViewOnlyComponent;
  let fixture: ComponentFixture<EquipmentInventoryViewOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentInventoryViewOnlyComponent ],
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
    fixture = TestBed.createComponent(EquipmentInventoryViewOnlyComponent);
  });

  it('should create', () => {
    const app  = fixture.debugElement.componentInstance;
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

  it('should have amount on stock column', ()=>{
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#amount')?.textContent).toContain('Amount In Stock');
  })

});
