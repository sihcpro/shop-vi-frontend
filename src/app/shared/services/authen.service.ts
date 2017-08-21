import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SystemConstants } from '../common/system.constants';
import 'rxjs/add/operator/map';
import { LoggedInUser } from '../domain/logged-in-user';
@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }

  login = (email: string, password: string) => {
    let body = "email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let options = new RequestOptions({ headers: headers });

    return this._http.post(SystemConstants.BASE_API + "/login", body, options)
      .map((response: Response) => {
        let user: LoggedInUser = response.json();
        console.log(response);
        
        if (user && user.auth_token) {
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
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
    let user: LoggedInUser;
    if (this.isUserAuthenticated) {
      var data = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedInUser(data.auth_token, data.email, data.fullname, data.avatar);
    } else {
      user = null;
    }
    return user;
  }
}