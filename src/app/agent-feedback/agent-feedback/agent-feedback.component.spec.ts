import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgentFeedbackSearchPipe } from '../feedbackpipe/agent-feedback-search.pipe';

import { AgentFeedbackComponent } from './agent-feedback.component';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('AgentFeedbackComponent', () => {
  let component: AgentFeedbackComponent;
  let fixture: ComponentFixture<AgentFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentFeedbackComponent, AgentFeedbackSearchPipe],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentFeedbackComponent);
  });

  it('should create', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have date search', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#datePicker')).toBeTruthy();
  })
  
});
