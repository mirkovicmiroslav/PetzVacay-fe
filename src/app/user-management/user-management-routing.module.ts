import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationStepOneComponent } from './registration-petSitter/registration-step-one/registration-step-one.component';
import { RegistrationStepTwoComponent } from './registration-petSitter/registration-step-two/registration-step-two.component';
import { RegistrationStepThreeComponent } from './registration-petSitter/registration-step-three/registration-step-three.component';
import { IsNotPetSitterGuard } from '../core/guards/isNotPetSitter.guard';
import { UpdateUserProfileComponent } from './update-profile/update-user-profile/update-user-profile.component';
import { ChangePasswordComponent } from './update-profile/change-password/change-password.component';

const routes: Routes = [
  { path: 'becomePetSitterStepOne', component: RegistrationStepOneComponent, canActivate: [IsNotPetSitterGuard] },
  { path: 'becomePetSitterStepTwo', component: RegistrationStepTwoComponent, canActivate: [IsNotPetSitterGuard] },
  { path: 'becomePetSitterStepThree', component: RegistrationStepThreeComponent, canActivate: [IsNotPetSitterGuard] },
  { path: 'updateProfile', component: UpdateUserProfileComponent },
  { path: 'changePassword', component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
