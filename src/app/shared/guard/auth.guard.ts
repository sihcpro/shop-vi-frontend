import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { SystemConstants } from '../common/system.constants';
import { UrlConstants } from '../common/url.constants';
import { NotificationService } from '../services/notification.service';
import { MessageConstants } from '../common/message.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(SystemConstants.CURRENT_USER)) {
      return true;
    } else {
      this._router.navigate([UrlConstants.LOGIN], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }
  }
}
