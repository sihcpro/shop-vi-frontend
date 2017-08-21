
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const appRouting: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: 'app/main/home/home.module#HomeModule' },
      { path: 'login', loadChildren: 'app/main/login/login.module#LoginModule' },
      { path: 'register', loadChildren: './main/register/register.module#RegisterModule' },
    ]
  }
];