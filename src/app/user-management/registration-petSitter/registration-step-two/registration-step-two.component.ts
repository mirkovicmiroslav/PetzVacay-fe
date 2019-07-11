import { ServiceTypes } from '../../../core/models/serviceTypes.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/core/models/userServices.model';

@Component({
  selector: 'app-registration-step-two',
  templateUrl: './registration-step-two.component.html',
  styleUrls: ['./registration-step-two.component.css']
})
export class RegistrationStepTwoComponent implements OnInit {
  userServices: UserServices = new UserServices();
  serviceTypes: ServiceTypes = new ServiceTypes();

  @ViewChild('stepTwoForm')
  stepTwoForm: NgForm;

  constructor(private userService: UserManagementService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.getAllServices();
  }

  getAllServices() {
    this.userService.getAllServices().subscribe(
      response => {
        this.serviceTypes = response;
        this.getInfoRegistrationStepTwo();
      },
      error => {}
    );
  }

  getInfoRegistrationStepTwo() {
    this.userService.getInfoRegistrationStepTwo().subscribe(response => {
      this.userServices = response;

      for (let service of this.userServices.services) {
        for (let allService of this.serviceTypes.services) {
          if (service === allService.idService) {
            allService.checked = true;
          }
        }
      }
    });
  }

  onChangeServiceType() {
    this.userServices.services = this.serviceTypes.services.filter(service => service.checked).map(service => service.idService);
  }

  onBackToStepOne() {
    this.router.navigate(['/users/becomePetSitterStepOne']);
  }

  onSubmitStepTwo() {
    if (this.userServices.services === undefined || this.userServices.services.length == 0) {
      this.toastr.error('You must choose at least one service');
    } else {
      this.userService.registrationStepTwo(this.userServices).subscribe(
        response => {
          this.router.navigate(['/users/becomePetSitterStepThree']);
        },
        error => {
          this.toastr.error('Failed to go on step three');
        }
      );
    }
  }
}
