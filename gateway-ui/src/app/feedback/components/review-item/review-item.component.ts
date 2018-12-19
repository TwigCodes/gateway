import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Employee } from '@app/feedback/feedback.model';

export const buttonBarAnim = trigger('buttonBar', [
  state('leave', style({ opacity: 0 })),
  state(
    'enter',
    style({
      opacity: 1
    })
  ),
  transition('leave => enter', animate('200ms ease-in')),
  transition('enter => leave', animate('200ms ease-out'))
]);

@Component({
  selector: 'tgapp-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
  animations: [buttonBarAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewItemComponent implements OnInit {
  @Input() item: Employee;
  @Input() relation: string;
  @Output() accept = new EventEmitter();
  @Output() decline = new EventEmitter();
  buttonBarState = 'leave';
  constructor() {}

  ngOnInit() {}

  toggleButtonBar(show: Boolean) {
    this.buttonBarState = show ? 'enter' : 'leave';
  }

  toAccept(item: Employee) {
    this.accept.emit(item);
  }

  toDecline(item: Employee) {
    this.decline.emit(item);
  }
}
