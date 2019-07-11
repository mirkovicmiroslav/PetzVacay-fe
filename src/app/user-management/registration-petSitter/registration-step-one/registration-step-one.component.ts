import { Component, OnInit, ViewChild } from '@angular/core';
import { UserInfoStepOne } from 'src/app/core/models/userInfoStepOne.model';
import { NgForm } from '@angular/forms';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-step-one',
  templateUrl: './registration-step-one.component.html',
  styleUrls: ['./registration-step-one.component.css']
})
export class RegistrationStepOneComponent implements OnInit {
  userInfo: UserInfoStepOne = new UserInfoStepOne();

  @ViewChild('stepOneForm')
  stepOneForm: NgForm;

  constructor(private userService: UserManagementService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.getInfoRegistrationStepOne();
  }

  getInfoRegistrationStepOne() {
    this.userService.getInfoRegistrationStepOne().subscribe(
      response => {
        this.userInfo = response;
      },
      error => {}
    );
  }

  onSubmitStepOne() {
    this.userService.registrationStepOne(this.userInfo).subscribe(
      response => {
        this.router.navigate(['/users/becomePetSitterStepTwo']);
      },
      error => {
        this.toastr.error('Failed to go on step two');
      }
    );
  }
}
