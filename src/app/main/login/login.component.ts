import { Component, OnInit } from '@angular/core';
import { AuthenService, NotificationService } from "../../shared/index";
import { Router } from '@angular/router';
import { UrlConstants } from '../../shared/common/url.constants';
import { SystemConstants } from '../../shared/common/system.constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  model: any = {}
  loading: boolean = false;
  returnUrl: string;
  constructor(
    private _authenService: AuthenService,
    private _notificationService: NotificationService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login = () => {
    this.loading = true;
    this._authenService.login(this.model.email, this.model.password)
      .subscribe(data => {
        let current_user = localStorage.getItem(SystemConstants.CURRENT_USER);
        if (current_user) {
          this._router.navigate([UrlConstants.HOME]);
          this._notificationService.printSuccessMessage('Login success!');
        } else {
          this._notificationService.printErrorMessage("Invalid user!");
          this.loading = false;
        }
      }, error => {
        this._notificationService.printErrorMessage("Cannot connect to server!");
        this.loading = false;
      });
  }

}
