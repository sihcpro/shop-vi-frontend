import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  DataService,
  AuthenService,
  NotificationService,
  UtilityService
} from "../../shared/index";

export const registerRouter: Routes = [
  { path: '', component: RegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(registerRouter)
  ],
  providers: [
    DataService,
    AuthenService,
    NotificationService,
    UtilityService
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
