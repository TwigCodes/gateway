import {
  trigger,
  animate,
  transition,
  style,
  state
} from '@angular/animations';

export const rotateAnimation = trigger('rotateAnimation', [
  state('initial', style({ transform: 'rotate(0deg)' })),
  state('rotated', style({ transform: 'rotate(-180deg)' })),
  transition('* => *', [animate('.4s ease')])
]);

export const rotateEnterAnimation = trigger('rotateEnterAnimation', [
  transition(':enter', [
    style({ transform: 'rotate(0deg)', opacity: 0 }),
    animate('500ms', style({ transform: 'rotate(-180deg)', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
  ])
]);
