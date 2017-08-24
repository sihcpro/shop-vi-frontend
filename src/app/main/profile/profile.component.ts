import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { SystemConstants } from '../../shared/common/system.constants';
import { AuthenService } from '../../shared/services/authen.service';
import { MessageConstants } from '../../shared/common/message.constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  loading = false;
  constructor(
    private _authenService: AuthenService,
    private _dataService: DataService,
    private _notificationService: NotificationService,
    private _router: Router
  ) {
    this._dataService.get('/users').subscribe(data => {
      console.log(data);
      if (data) {
        this.user = data;
      }
      console.log(this.user.email);
    })
  }
  ngOnInit() {

  }

  updateAccount = () => {
    this.loading = true;
    let data: any = {
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      phone: this.user.phone,
      address: this.user.address,
      province: this.user.province,
      zipcode: this.user.zipcode
    };
    this._dataService.put('/users', data).subscribe(data => {
      console.log(data);
      if (data.status == 202) {
        this._notificationService.printSuccessMessage(data.message);
        this.loading = false;
        this._router.navigate(['profile']);
      }
      else {
        this._notificationService.printErrorMessage(data.message);
        this.loading = false;
      }
    }, error => {
      this._notificationService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
      this.loading = false;
    });
  }


}
