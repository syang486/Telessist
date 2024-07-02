import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogListAdminComponent } from './call-log-list-admin.component';

describe('CallLogListAdminComponent', () => {
  let component: CallLogListAdminComponent;
  let fixture: ComponentFixture<CallLogListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLogListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallLogListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
