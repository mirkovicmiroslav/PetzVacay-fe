import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationStepOneComponent } from './registration-petSitter/registration-step-one/registration-step-one.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { FormsModule } from '@angular/forms';
import { RegistrationStepTwoComponent } from './registration-petSitter/registration-step-two/registration-step-two.component';
import { RegistrationStepThreeComponent } from './registration-petSitter/registration-step-three/registration-step-three.component';
import { UpdateUserProfileComponent } from './update-profile/update-user-profile/update-user-profile.component';
import { ChangePasswordComponent } from './update-profile/change-password/change-password.component';

@NgModule({
  declarations: [
    RegistrationStepOneComponent,
    RegistrationStepTwoComponent,
    RegistrationStepThreeComponent,
    UpdateUserProfileComponent,
    ChangePasswordComponent
  ],
  imports: [CommonModule, FormsModule, UserManagementRoutingModule]
})
export class UserManagementModule {}
