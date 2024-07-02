import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgentFeedbackSearchPipe } from '../feedbackpipe/agent-feedback-search.pipe';

import { AdminFeedbackComponent } from './admin-feedback.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminFeedbackSearchPipe } from '../feedbackpipe/admin-feedback-search.pipe';

describe('AdminFeedbackComponent', () => {
  let component: AdminFeedbackComponent;
  let fixture: ComponentFixture<AdminFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeedbackComponent, AgentFeedbackSearchPipe, AdminFeedbackSearchPipe ],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule
      ],
      providers:[
        AgentFeedbackSearchPipe, AdminFeedbackSearchPipe
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeedbackComponent);
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
