import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDetailContainerComponent } from './role-detail-container.component';

describe('RoleDetailContainerComponent', () => {
  let component: RoleDetailContainerComponent;
  let fixture: ComponentFixture<RoleDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
