import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangePassword } from 'src/app/core/models/changePassword.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userInfo: ChangePassword = new ChangePassword();

  @ViewChild('resetPassword')
  resetPassword: NgForm;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserManagementService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {}

  onChangePassword() {
    if (this.userInfo.newPassword === this.userInfo.confirmNewPassword) {
      this.userService.updateUserPassword(this.userInfo).subscribe(
        response => {
          this.tokenService.destroyToken();
          this.router.navigate(['/']);
          this.toastr.success('Successfully changed password!');
        },
        error => {
          this.toastr.error('Incorrect old password!');
        }
      );
    } else {
      this.toastr.error('New password and confirm password do not match!');
    }
  }
}
