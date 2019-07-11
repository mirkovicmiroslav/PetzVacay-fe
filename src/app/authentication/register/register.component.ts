import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { User } from 'src/app/core/models/register.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData: User = new User();
  rPassword: String = '';

  @ViewChild('signUpForm')
  signUpForm: NgForm;

  constructor(private authService: AuthentificationService, private router: Router, private toastr: ToastrService) {}
  ngOnInit() {}

  onRegister() {
    if (this.rPassword !== this.userData.password) {
      this.toastr.error('Passwords do not match!', 'Unable to register');
    } else {
      this.authService.register(this.userData).subscribe(
        response => {
          this.toastr.success(
            'We have sent you an email. Please, check your inbox and verify your email address in order to complete the registration.'
          );
          this.router.navigate(['/']);
        },
        error => {
          this.toastr.error('Email address already exist', 'Unable to register');
        }
      );
    }
  }
}
