import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { NgForm } from '@angular/forms';
import { UserInfoStepThree } from 'src/app/core/models/userInfoStepThree.model';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-registration-step-three',
  templateUrl: './registration-step-three.component.html',
  styleUrls: ['./registration-step-three.component.css']
})
export class RegistrationStepThreeComponent implements OnInit {
  petSitterInfo: UserInfoStepThree = new UserInfoStepThree();
  imageUpload;

  @ViewChild('stepThreeForm')
  stepThreeForm: NgForm;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserManagementService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.getInfoStepThree();
  }

  onFileSelected(event) {
    this.imageUpload = event.target.files[0];
  }

  getInfoStepThree() {
    this.userService.getInfoRegistrationStepThree().subscribe(response => {
      this.petSitterInfo = response;
    });
  }

  onBackToStepTwo() {
    this.router.navigate(['/users/becomePetSitterStepTwo']);
  }

  onUploadImage() {
    this.userService.uploadProfileImage(this.imageUpload).subscribe(
      response => {},
      error => {
        this.toastr.error('Failed to upload image');
      }
    );
  }

  onFinish() {
    this.userService.registrationStepThree(this.petSitterInfo).subscribe(
      response => {
        if (this.imageUpload) {
          this.onUploadImage();
        }
        this.tokenService.destroyToken();
        this.router.navigate(['/']);
        this.toastr.success('You have become a PetzVacay"s Sitter!', 'Success');
      },
      error => {
        this.toastr.error('Failed to finish');
      }
    );
  }
}
