import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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
    this.headers.delete('Authorization');
    this.headers.append('Authorization', "Bearer" + this._authenService.getLoggedUser().auth_token);
    return this._http.get(SystemConstants.BASE_API + url, { headers: this.headers })
      .map(this.extractData);
  }

  post = (url: string, data?: any) => {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer' + this._authenService.getLoggedUser().auth_token);
    return this._http.post(SystemConstants.BASE_API + url, data, { headers: this.headers })
      .map(this.extractData);
  }

  put = (url: string, data?: any) => {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer' + this._authenService.getLoggedUser().auth_token);
    return this._http.put(SystemConstants.BASE_API + url, data, { headers: this.headers })
      .map(this.extractData);
  }

  delete = (url: string, key: string, id: string) => {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer' + this._authenService.getLoggedUser().auth_token);
    return this._http.delete(SystemConstants.BASE_API + url + "/?" + key + "=" + id, { headers: this.headers })
      .map(this.extractData);
  }

  postFile = (url: string, data?: any) => {
    let newHeader = new Headers();
    newHeader.append('Authorization', 'Bearer' + this._authenService.getLoggedUser().auth_token);
    return this._http.post(SystemConstants.BASE_API + url, data, { headers: newHeader })
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
}