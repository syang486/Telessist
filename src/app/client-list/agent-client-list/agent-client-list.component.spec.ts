import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentClientListComponent } from './agent-client-list.component';
import { ClientsearchPipe } from '../pipe/clientsearch.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('AgentClientListComponent', () => {
  let component: AgentClientListComponent;
  let fixture: ComponentFixture<AgentClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentClientListComponent, ClientsearchPipe ],
      imports: [
        HttpClientModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentClientListComponent);
  });

  it('should create', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have search bar', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement as HTMLElement;
    expect(app.querySelector('#searchBar')).toBeTruthy();
  });
});
