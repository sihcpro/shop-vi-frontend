import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmAccountComponent } from './confirm-account.component';
import { Routes, RouterModule } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { DataService } from '../../shared/services/data.service';
import { AuthenService } from '../../shared/services/authen.service';
import { UtilityService } from '../../shared/services/utility.service';
export const confirmAccountRouter: Routes = [
  { path: ':confirm_token', component: ConfirmAccountComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(confirmAccountRouter)
  ],
  providers: [NotificationService, DataService, AuthenService, UtilityService],
  declarations: [ConfirmAccountComponent]
})
export class ConfirmAccountModule { }
