import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditContainerComponent } from './audit-container.component';

describe('AuditContainerComponent', () => {
  let component: AuditContainerComponent;
  let fixture: ComponentFixture<AuditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
