import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RolComponent } from "./pages/rol/rol.component";

const AUTH_ROUTES: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
      },
      {
        path: "rol",
        component: RolComponent,
      },
      {
        path: "**",
        redirectTo: "login",
      },
    ],
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AUTH_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
