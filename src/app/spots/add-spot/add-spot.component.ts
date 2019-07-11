import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserServices } from "src/app/core/models/userServices.model";
import { ServiceTypes } from "src/app/core/models/serviceTypes.model";
import { UserManagementService } from "src/app/core/services/user-management.service";
import { SpotService } from "src/app/core/services/spot.service";
import { ToastrService } from "ngx-toastr";
import { AddSpot } from "src/app/core/models/addSpot.model";

@Component({
  selector: "app-add-spot",
  templateUrl: "./add-spot.component.html",
  styleUrls: ["./add-spot.component.css"]
})
export class AddSpotComponent implements OnInit {
  userServices: UserServices = new UserServices();
  serviceTypes: ServiceTypes = new ServiceTypes();
  newSpot: AddSpot = new AddSpot();
  date;
  newUnit;
  daysOfMonth: number[] = [];

  @ViewChild("addSpot")
  addSpot: NgForm;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private userService: UserManagementService,
    private spotService: SpotService
  ) {}

  ngOnInit() {
    this.getDate();
    this.generateDatesOfMonth();
    this.getAllUserServices();
  }

  getAllUserServices() {
    this.userService.getAllUserServices().subscribe(
      response => {
        this.serviceTypes = response;
      },
      error => {}
    );
  }

  generateDatesOfMonth() {
    for (var i = 0; i <= 31; i++) {
      this.daysOfMonth.push(i);
    }
  }

  onChangeUnit(event) {
    return event === "Day"
      ? (this.newUnit = "Day")
      : (this.newUnit = "Session");
  }

  getDate() {
    this.route.params.subscribe(params => {
      this.date = new Date(params["date"]);
      this.newSpot.date = params["date"];
      this.newSpot.endDate = params["date"];
    });
  }

  createSpot() {
    if (this.newSpot.date < this.datePipe.transform(new Date(), "yyyy-MM-dd")) {
      this.toastr.error("Spot date is before current date");
    } else if (
      this.newSpot.frequency != "One time only" &&
      this.newSpot.date >= this.newSpot.endDate
    ) {
      this.toastr.error("End date must be greater then current date");
    } else {
      this.spotService.addSpot(this.newSpot).subscribe(
        response => {
          this.toastr.success("Successfuly create new spot");
          this.router.navigate(["/my-calendar"]);
        },
        error => {
          this.toastr.error("Failed to add create a new spot");
        }
      );
    }
  }
}
