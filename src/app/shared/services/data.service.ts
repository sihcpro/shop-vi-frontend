import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthenService } from './authen.service';
import { SystemConstants } from '../common/system.constants';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
@Injectable()
export class DataService {

  private headers: Headers;

  constructor(
    private _http: Http,
    private _router: Router,
    private _authenService: AuthenService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService
  ) { }

  get = (url: string) => {
    return this._http.get(SystemConstants.BASE_API + url, this.jwt())
      .map(this.extractData);
  }

  getUnAuthorticate = (url: string) => {
    return this._http.get(SystemConstants.BASE_API + url)
      .map(this.extractData);
  }

  post = (url: string, data?: any) => {
    return this._http.post(SystemConstants.BASE_API + url, data, this.jwt())
      .map(this.extractData);
  }

  postUnAuthorticate = (url: string, data?: any) => {
    return this._http.post(SystemConstants.BASE_API + url, data)
      .map(this.extractData);
  }

  put = (url: string, data?: any) => {
    return this._http.put(SystemConstants.BASE_API + url, data, this.jwt())
      .map(this.extractData);
  }

  delete = (url: string, key: string, id: string) => {
    return this._http.delete(SystemConstants.BASE_API + url + "/?" + key + "=" + id, this.jwt())
      .map(this.extractData);
  }

  postFile = (url: string, data?: any) => {
    return this._http.post(SystemConstants.BASE_API + url, data, this.jwt())
      .map(this.extractData);
  }

  private extractData = (res: Response) => {
    let body = res.json();
    return body || {};
  }

  public handleError = (error: any) => {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage("Authen error");
      this._utilityService.navigateToLogin();
    } else {
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status}` : 'System Error!';
      this._notificationService.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  }

  private jwt() {
    let currentUser = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    if (currentUser && currentUser.auth_token) {
      let headers = new Headers({ 'auth-token': currentUser.auth_token });
      return new RequestOptions({ headers: headers });
    }
  }
}