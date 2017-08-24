import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AsideComponent } from '../../shared/layout/aside.component';

export const homeRouter: Routes = [
  { path: '', component: HomeComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRouter)
  ],
  providers: [],
  declarations: [
    HomeComponent,
    AsideComponent
  ]
})
export class HomeModule { }
