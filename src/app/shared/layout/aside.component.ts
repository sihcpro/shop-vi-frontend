import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from '../services/authen.service';
import { NotificationService } from '../services/notification.service';
import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'layout-aside',
  templateUrl: './aside.component.html',
  providers: [AuthenService, NotificationService, DataService, UtilityService]
})

export class AsideComponent implements OnInit {
  categories: any = {};
  constructor(
    private _router: Router,
    private _uthenService: AuthenService,
    private _notificationService: NotificationService,
    private _dataService: DataService
  ) {
    this._dataService.getUnAuthorticate('/categorys').subscribe(data => {
      this.categories = data;
    });
    console.log(this.categories);
  }

  ngOnInit() { }

}