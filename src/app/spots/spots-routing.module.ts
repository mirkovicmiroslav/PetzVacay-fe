import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { AddSpotComponent } from './add-spot/add-spot.component';
import { UpdateSpotComponent } from './update-spot/update-spot.component';

const routes: Routes = [
  { path: 'my-calendar', component: MyCalendarComponent },
  { path: 'spot/:date', component: AddSpotComponent },
  { path: 'spot/update/:idSpot', component: UpdateSpotComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotsRoutingModule {}
