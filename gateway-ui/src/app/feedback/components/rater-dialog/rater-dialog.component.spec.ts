import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaterDialogComponent } from './rater-dialog.component';

describe('RaterDialogComponent', () => {
  let component: RaterDialogComponent;
  let fixture: ComponentFixture<RaterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
