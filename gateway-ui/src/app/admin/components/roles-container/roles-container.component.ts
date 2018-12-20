import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthAdminService } from '@app/admin/services/auth-admin.service';

@Component({
  selector: 'tgapp-roles-container',
  templateUrl: './roles-container.component.html',
  styleUrls: ['./roles-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesContainerComponent implements OnInit {
  constructor(private service: AuthAdminService) {}
  roles$ = this.service.getRoles().pipe(
    map(roles =>
      roles.map(role => ({
        id: role.id,
        title: role.name,
        subtitle: role.containerId,
        desc: role.description
      }))
    )
  );
  ngOnInit() {}
}
