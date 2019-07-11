import { Component, OnInit, ViewChild } from "@angular/core";
import { SpotInfo } from "src/app/core/models/spotInfo.model";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { SpotService } from "src/app/core/services/spot.service";
import { ServiceTypes } from "src/app/core/models/serviceTypes.model";
import { NgForm } from "@angular/forms";
import { UserServices } from "src/app/core/models/userServices.model";
import { UserManagementService } from "src/app/core/services/user-management.service";
import { DatePipe } from "@angular/common";
import { stringify } from "@angular/compiler/src/util";

@Component({
  selector: "app-update-spot",
  templateUrl: "./update-spot.component.html",
  styleUrls: ["./update-spot.component.css"]
})
export class UpdateSpotComponent implements OnInit {
  spotInfo: SpotInfo = new SpotInfo();
  userServices: UserServices = new UserServices();
  serviceTypes: ServiceTypes = new ServiceTypes();
  idSpot;
  newUnit;
  myMap = new Map();

  @ViewChild("updateSpot")
  updateSpot: NgForm;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private spotService: SpotService,
    private userService: UserManagementService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getAllUserServices();
  }

  getAllUserServices() {
    this.userService.getAllUserServices().subscribe(
      response => {
        this.serviceTypes = response;
        this.route.params.subscribe(params => {
          if (params["idSpot"]) {
            this.idSpot = params["idSpot"];
            this.getSingleSpot(params["idSpot"]);
          }
        });
      },
      error => {}
    );
  }

  getSingleSpot(idSpot) {
    this.spotService.getSingleSpot(idSpot).subscribe(response => {
      this.spotInfo = response;
      this.spotInfo.date = this.datePipe.transform(
        this.spotInfo.date,
        "yyyy-MM-dd"
      );
      this.newUnit = this.spotInfo.unit;
      for (let s of this.serviceTypes.services) {
        this.myMap.set(s.idService, s.description);
      }
      this.myMap.forEach((value: string, key: number) => {
        if (value === response.service) {
          this.spotInfo.service = key;
        }
      });
    });
  }

  onUpdateSpot() {
    this.spotService
      .updateSpot(this.spotInfo, this.idSpot)
      .subscribe(response => {
        this.toastr.success("Successfuly updated spot");
        this.router.navigate(["/my-calendar"]);
      });
  }

  onChangeUnit(event) {
    return event === "Day"
      ? (this.newUnit = "Day")
      : (this.newUnit = "Session");
  }
}
