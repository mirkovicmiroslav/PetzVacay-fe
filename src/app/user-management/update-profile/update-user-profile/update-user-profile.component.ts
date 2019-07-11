import { Component, OnInit, ViewChild } from '@angular/core';
import { PetOwnerInfo } from 'src/app/core/models/petOwnerInfo.model';
import { PetSitterInfo } from 'src/app/core/models/petSitterInfo.model';
import { UserInfoStepTwo } from 'src/app/core/models/userInfoStepTwo.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { UserServices } from 'src/app/core/models/userServices.model';
import { ServiceTypes } from 'src/app/core/models/serviceTypes.model';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit {
  petOwnerInfo: PetOwnerInfo = new PetOwnerInfo();
  petSitterInfo: PetSitterInfo = new PetSitterInfo();
  userInfo: UserInfoStepTwo = new UserInfoStepTwo();
  userServices: UserServices = new UserServices();
  serviceTypes: ServiceTypes = new ServiceTypes();
  userHasProfileImage: boolean;
  userChangeProfileImage: boolean;
  profileImg;
  imageUpload;

  isPetSitter: boolean;

  @ViewChild('updatePetOwner')
  updatePetOwner: NgForm;
  @ViewChild('updatePetSitter')
  updatePetSitter: NgForm;

  constructor(
    private router: Router,
    private userService: UserManagementService,
    private authService: AuthentificationService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.isPetSitter = this.authService.isPetSitter();
    this.getInfoPetOwner();
    if (this.isPetSitter) {
      this.getInfoPetSitter();
      this.getAllServices();
    }
    this.getUserProfileImage();
  }

  getInfoPetOwner() {
    this.userService.getInfoPetOwner().subscribe(response => {
      this.petOwnerInfo = response;
    });
  }

  getInfoPetSitter() {
    this.userService.getInfoPetSitter().subscribe(response => {
      this.petSitterInfo = response;
    });
  }

  onUpdatePetOwner() {
    this.userService.updateInfoPetOwner(this.petOwnerInfo).subscribe(response => {
      this.onUploadImage();
      this.router.navigate(['/dashboard']);
    });
  }

  onUpdatePetSitter() {
    if (this.userServices.services === undefined || this.userServices.services.length == 0) {
      this.toastr.error('You must choose at least one service');
    } else {
      this.petSitterInfo.services = this.userServices.services;
      this.userService.updatePetSitterInfo(this.petSitterInfo).subscribe(response => {
        this.onUploadImage();
        this.router.navigate(['/dashboard']);
      });
    }
  }

  onChangeServiceType() {
    this.userServices.services = this.serviceTypes.services.filter(service => service.checked).map(service => service.idService);
  }

  getAllServices() {
    this.userService.getAllServices().subscribe(
      response => {
        this.serviceTypes = response;
        this.getUserServices();
      },
      error => {}
    );
  }

  getUserServices() {
    this.userService.getInfoRegistrationStepTwo().subscribe(
      response => {
        this.userServices = response;

        for (let service of this.userServices.services) {
          for (let allService of this.serviceTypes.services) {
            if (service === allService.idService) {
              allService.checked = true;
            }
          }
        }
      },
      error => {}
    );
  }

  getUserProfileImage() {
    this.userService.getProfileImage().subscribe(response => {
      if (response.profileImage != null) {
        this.userHasProfileImage = true;
        this.profileImg = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + response.profileImage);
      } else {
        this.userHasProfileImage = false;
      }
    });
  }

  onFileSelected(event) {
    this.imageUpload = event.target.files[0];
    this.userChangeProfileImage = true;
    this.userHasProfileImage = true;
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.profileImg = e.target.result;
    };

    reader.readAsDataURL(this.imageUpload);
  }

  onUploadImage() {
    if (this.userChangeProfileImage) {
      this.userService.uploadProfileImage(this.imageUpload).subscribe(
        response => {},
        error => {
          this.toastr.error('Failed to upload image');
        }
      );
    }
  }
}
