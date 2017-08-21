import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenService, NotificationService } from "../../shared/index";

export const loginRouter: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(loginRouter)
  ],
  providers: [AuthenService, NotificationService],
  declarations: [LoginComponent]
})
export class LoginModule { }
