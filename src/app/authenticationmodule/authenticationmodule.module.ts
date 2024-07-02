import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationmoduleRoutingModule } from './authenticationmodule-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthenticationmoduleRoutingModule,

  ]
})
export class AuthenticationmoduleModule { }
