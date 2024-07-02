import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateAgentDialogComponent } from './addupdate-agent-dialog.component';

describe('AddupdateAgentDialogComponent', () => {
  let component: AddupdateAgentDialogComponent;
  let fixture: ComponentFixture<AddupdateAgentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddupdateAgentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddupdateAgentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
