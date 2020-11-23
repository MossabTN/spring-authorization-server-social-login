import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import {HomeComponent} from "./home/home.component";
import {TasksComponent} from "./components/tasks/container/tasks.component";
import {LoginComponent} from "./core/auth/login/login.component";
import {UnauthGuard} from "./core/auth/unauth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, UnauthGuard]
})
export class AppRoutingModule {}
