import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentClientrequestComponent } from './agent-clientrequest.component';

describe('ClientrequestComponent', () => {
  let component: AgentClientrequestComponent;
  let fixture: ComponentFixture<AgentClientrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentClientrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentClientrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
