import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrGridWithFilterComponent } from './list-or-grid-with-filter.component';

describe('ListOrGridWithFilterComponent', () => {
  let component: ListOrGridWithFilterComponent;
  let fixture: ComponentFixture<ListOrGridWithFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrGridWithFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrGridWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
