import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddServiceTypeComponent } from './add-service-type/add-service-type.component';

const routes: Routes = [{ path: 'addServiceType', component: AddServiceTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManagementRoutingModule {}
