import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthentificationService } from '../core/services/authentification.service';
import { UserManagementService } from '../core/services/user-management.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  isLoggedIn: boolean;
  isPetSitter: boolean;
  isAdmin: boolean;
  userFirstName: string;
  userHasProfileImage: boolean;
  profileImg;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthentificationService,
    private userService: UserManagementService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.isUserLoggedIn();
    this.isPetSitter = this.authService.isPetSitter();
    this.isAdmin = this.authService.isAdmin();
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.getUserFirstName();
      this.getUserProfileImage();
    }
  }

  onLogin() {
    this.router.navigate(['/']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onLogout() {
    this.tokenService.destroyToken();
    this.router.navigate(['/']);
  }

  registerPetSitter() {
    this.router.navigate(['/users/becomePetSitterStepOne']);
  }

  getUserFirstName() {
    this.userService.getUserFirstName().subscribe(response => {
      this.userFirstName = response.firstName;
    });
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

  onAbout() {}

  createServiceTypes() {
    this.router.navigate(['/admin/addServiceType']);
  }
}
