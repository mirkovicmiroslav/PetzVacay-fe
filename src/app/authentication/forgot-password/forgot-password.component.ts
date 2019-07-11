import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/register.model';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userData: User = new User();

  @ViewChild('forgotPasswordForm')
  forgotPasswordForm: NgForm;

  constructor(private authService: AuthentificationService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.forgotPassword(this.userData.email).subscribe(
      response => {
        this.router.navigate(['/']);
        this.toastr.success('We have sent you an email with new password. Please, check your inbox.');
      },
      error => {
        this.toastr.error("Email address doesn't exist");
      }
    );
  }
}
