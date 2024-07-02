import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFrameComponent } from './agent-frame.component';

describe('AgentFrameComponent', () => {
  let component: AgentFrameComponent;
  let fixture: ComponentFixture<AgentFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
