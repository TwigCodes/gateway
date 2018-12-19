import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatersContainerComponent } from './raters-container.component';

describe('RatersContainerComponent', () => {
  let component: RatersContainerComponent;
  let fixture: ComponentFixture<RatersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatersContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
