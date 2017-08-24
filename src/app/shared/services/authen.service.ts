import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SystemConstants } from '../common/system.constants';
import 'rxjs/add/operator/map';
import { LoggedInUser } from '../domain/logged-in-user';
import { NotificationService } from './notification.service';
@Injectable()
export class AuthenService {

  constructor(
    private _http: Http,
    private _notificationService: NotificationService
  ) { }

  login = (email: string, password: string) => {
    let body = "email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let options = new RequestOptions({ headers: headers });

    return this._http.post(SystemConstants.BASE_API + "/login", body, options)
      .map((response: Response) => {
        console.log(response);
        let user: LoggedInUser = response.json();
        console.log(user);
        if (user && user.auth_token) {
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
          this._notificationService.printSuccessMessage('Login success!');
        } else {
          this._notificationService.printErrorMessage(response.json().message)
        }
      });
  }

  logout = () => {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  isUserAuthenticated = (): boolean => {
    let user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }

  getLoggedUser = (): LoggedInUser => {
    let user: any = {};
    if (this.isUserAuthenticated) {
      var data = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      // user = new LoggedInUser(data.auth_token, data.email, data.fullname, data.avatar);
      user = data;
    }
    return user;
  }
}