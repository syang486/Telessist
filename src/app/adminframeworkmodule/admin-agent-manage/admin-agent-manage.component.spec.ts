import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgentManageComponent } from './admin-agent-manage.component';

describe('AdminAgentManageComponent', () => {
  let component: AdminAgentManageComponent;
  let fixture: ComponentFixture<AdminAgentManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAgentManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAgentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
