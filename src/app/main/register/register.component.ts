import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { provinces } from '../../shared/common/vietnam-provinces';
import { NotificationService } from '../../shared/services/notification.service';
import { SystemConstants } from '../../shared/common/system.constants';
import { MessageConstants } from '../../shared/common/message.constants';
import { UtilityService } from '../../shared/services/utility.service';
import { UrlConstants } from '../../shared/common/url.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading: boolean = false;
  provinces: Array<any> = provinces;
  constructor(
    private _dataService: DataService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService
  ) { }

  ngOnInit() {
  }

  register = () => {
    this.loading = true;
    let data: any = {
      first_name: this.model.firstName,
      last_name: this.model.lastName,
      email: this.model.email,
      password: this.model.password,
      password_confirmation: this.model.confirmPassword
    };
    this._dataService.postUnAuthorticate('/register', data).subscribe(data => {
      console.log(data.status);
      
      if (data.status === 201) {
        this._notificationService.printSuccessMessage(data.message);
        this.loading = false;
        this._utilityService.navigate(UrlConstants.HOME);

      } else if (data.status === 409) {
        data.message.forEach(element => {
          this._notificationService.printErrorMessage(element);
          this.loading = false;
        });
      }
    }, error => {
      this._notificationService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
      this.loading = false;
    });
  }


}
