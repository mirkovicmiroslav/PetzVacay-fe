import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';
import { FullCalendarModule } from 'ng-fullcalendar';

@NgModule({
  declarations: [CustomCalendarComponent],
  imports: [CommonModule, FormsModule, FullCalendarModule],
  providers: [DatePipe],
  exports: [CustomCalendarComponent]
})
export class SharedModule {}
