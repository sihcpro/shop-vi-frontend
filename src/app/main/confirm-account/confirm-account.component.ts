import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { DataService } from '../../shared/services/data.service';
import { UrlConstants } from '../../shared/common/url.constants';
import { UtilityService } from '../../shared/services/utility.service';
import { MessageConstants } from '../../shared/common/message.constants';
import { SystemConstants } from '../../shared/common/system.constants';
@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html'
})
export class ConfirmAccountComponent implements OnInit {
  loading: boolean = true;
  confirm_token: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _notificationService: NotificationService,
    private _dataService: DataService,
    private _utilityService: UtilityService
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.confirm_token = params['confirm_token'];
      console.log(this.confirm_token);
    });
    this._dataService.getUnAuthorticate('/confirms/' + this.confirm_token).subscribe(data => {
      this.loading = false;
      if (data.status == 202) {
        this._notificationService.printSuccessMessage(data.message);
        this._utilityService.navigate(UrlConstants.LOGIN);
      }
      else if (data.status == 200) {
        this._notificationService.printWarningMessage(data.message);
        this._utilityService.navigate(UrlConstants.LOGIN);
      }
      else if (data.status == 403) {
        this._notificationService.printErrorMessage(data.message);
        this._utilityService.navigate(UrlConstants.LOGIN);
      }
      else {
        this._notificationService.printErrorMessage(data.message)
        this._utilityService.navigate(UrlConstants.LOGIN);
      }
    }, error => {
      this._notificationService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
      this.loading = false;
    });
  }





}
