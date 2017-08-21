import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export const registerRouter: Routes = [
  { path: '', component: RegisterComponent }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(registerRouter)
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
