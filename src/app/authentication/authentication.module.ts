import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [RegisterComponent, ForgotPasswordComponent, LoginComponent],
  imports: [CommonModule, FormsModule, AuthenticationRoutingModule]
})
export class AuthenticationModule {}
