import { Component, OnInit, ViewChild } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SpotService } from 'src/app/core/services/spot.service';
import { UserSpotInfo } from 'src/app/core/models/userSpotInfo.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.css']
})
export class MyCalendarComponent implements OnInit {
  spotInfo: UserSpotInfo = new UserSpotInfo();
  userSpotsByDate: UserSpotInfo = new UserSpotInfo();
  calendarInfo: OptionsInput;
  date: any;
  idSpot;

  constructor(
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router,
    private spotService: SpotService
  ) {}

  ngOnInit() {
    this.getSpotsInfo();
  }

  getDate(): String {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  getSpotsInfo() {
    this.spotService.getAllSpots().subscribe(response => {
      this.spotInfo = response;

      var events = [];
      for (var i = 0; i < this.spotInfo.spots.length; i++) {
        events.push({
          id: this.spotInfo.spots[i].idSpot,
          title: this.spotInfo.spots[i].service,
          start: this.datePipe.transform(this.spotInfo.spots[i].dateTime, 'yyyy-MM-dd')
        });
      }
      this.calendarInfo = {
        editable: false,
        events,
        header: {
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        plugins: [dayGridPlugin, interactionPlugin]
      };
    });
  }

  getUserSpotsByDate(info) {
    $('#modal').modal();
    this.idSpot = info.event.id;
    this.date = this.datePipe.transform(info.event.start, 'dd MMM yyyy');
    this.spotService.getUserSpotsByDate(this.datePipe.transform(info.event.start, 'yyyy-MM-dd')).subscribe(response => {
      this.userSpotsByDate = response;
    });
  }

  onEdit() {
    this.router.navigate(['spot/update/' + this.idSpot]);
  }

  onDelete() {
    this.spotService.deleteSpot(this.idSpot).subscribe(response => {
      this.toastr.success('Successfuly deleted spot');
      this.router.navigate(['/dashboard']);
    });
  }
}
