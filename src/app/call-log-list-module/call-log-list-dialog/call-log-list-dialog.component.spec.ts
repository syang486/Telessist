import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogListDialogComponent } from './call-log-list-dialog.component';

describe('CallLogListDialogComponent', () => {
  let component: CallLogListDialogComponent;
  let fixture: ComponentFixture<CallLogListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLogListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallLogListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
