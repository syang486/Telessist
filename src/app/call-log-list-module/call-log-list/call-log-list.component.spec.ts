import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogListComponent } from './call-log-list.component';

describe('CallLogListComponent', () => {
  let component: CallLogListComponent;
  let fixture: ComponentFixture<CallLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLogListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
