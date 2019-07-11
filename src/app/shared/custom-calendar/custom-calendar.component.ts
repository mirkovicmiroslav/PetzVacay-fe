import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css']
})
export class CustomCalendarComponent implements OnInit {
  @Input()
  options: OptionsInput;
  @Output()
  datePicked = new EventEmitter<any>();
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;

  constructor(private router: Router, private toastr: ToastrService, private datePipe: DatePipe) {}

  ngOnInit() {}

  dateClick(model) {
    this.router.navigate(['spot/' + model.dateStr]);
  }

  eventClick(model) {
    this.datePicked.emit(model);
  }
}
