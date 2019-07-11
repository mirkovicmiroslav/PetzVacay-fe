import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { SharedModule } from '../shared/shared.module';
import { SpotsRoutingModule } from './spots-routing.module';
import { AddSpotComponent } from './add-spot/add-spot.component';
import { FormsModule } from '@angular/forms';
import { CustomCalendarComponent } from '../shared/custom-calendar/custom-calendar.component';
import { UpdateSpotComponent } from './update-spot/update-spot.component';

@NgModule({
  declarations: [MyCalendarComponent, AddSpotComponent, UpdateSpotComponent],
  imports: [CommonModule, FormsModule, SharedModule, SpotsRoutingModule],
  providers: [CustomCalendarComponent]
})
export class SpotsModule {}
