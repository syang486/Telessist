import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ClientsearchPipe } from '../pipe/clientsearch.pipe';

import { ClientListComponent } from './client-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListComponent, ClientsearchPipe ],
      imports: [
        HttpClientModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        BrowserAnimationsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientListComponent);
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
