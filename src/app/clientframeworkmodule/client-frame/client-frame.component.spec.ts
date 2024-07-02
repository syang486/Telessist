import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFrameComponent } from './client-frame.component';

describe('ClientFrameComponent', () => {
  let component: ClientFrameComponent;
  let fixture: ComponentFixture<ClientFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
