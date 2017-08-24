import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthenService } from '../../shared/services/authen.service';
import { UtilityService } from '../../shared/services/utility.service';

export const profileRouter: Routes = [
  { path: '', component: ProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(profileRouter)
  ],
  declarations: [ProfileComponent],
  providers: [DataService, DataService, NotificationService, AuthenService, UtilityService]
})
export class ProfileModule { }
