import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceTypeComponent } from './add-service-type/add-service-type.component';
import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddServiceTypeComponent],
  imports: [CommonModule, FormsModule, AdminManagementRoutingModule]
})
export class AdminManagementModule {}
