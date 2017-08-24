import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from '../domain/logged-in-user';
import { SystemConstants } from '../common/system.constants';
import { Router } from '@angular/router';
import { AuthenService } from '../services/authen.service';
import { NotificationService } from '../services/notification.service';
import 'rxjs/add/operator/map';
import { UrlConstants } from '../common/url.constants';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  providers: [AuthenService, NotificationService]
})

export class HeaderComponent implements OnInit {
  current_user: LoggedInUser;

  constructor(
    private _router: Router,
    private _uthenService: AuthenService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.current_user = this._uthenService.getLoggedUser();
  }

  logout = () => {
    this._uthenService.logout();
    this._router.navigate([UrlConstants.HOME]);
  }
}