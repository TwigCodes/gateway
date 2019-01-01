import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RoleEffects } from './role.effects';

describe('RoleEffects', () => {
  let actions$: Observable<any>;
  let effects: RoleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoleEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(RoleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
