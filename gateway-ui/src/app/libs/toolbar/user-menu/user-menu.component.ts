import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'ngx-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent implements OnInit {
  isOpen: boolean;
  @Input() currentUser = null;
  @Output() logout = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  public handleLogout() {
    this.logout.emit();
  }
}
