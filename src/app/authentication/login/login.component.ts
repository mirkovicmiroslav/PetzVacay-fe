import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { TokenService } from 'src/app/core/services/token.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from 'src/app/core/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: Login = new Login();
  token: String;

  @ViewChild('loginForm')
  loginForm: NgForm;

  constructor(
    private tokenService: TokenService,
    private authService: AuthentificationService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['token']) {
        this.onRegistrationConfirm(params['token']);
      }
    });
  }

  onLogin() {
    this.authService.login(this.loginData).subscribe(
      response => {
        this.tokenService.saveToken(response.accessToken);
        this.router.navigate(['/dashboard']);
        this.authService.isPetSitter();
      },
      error => {
        this.toastr.error('Incorrect email or password', 'Unable to login');
      }
    );
  }

  onRegistrationConfirm(token: String) {
    this.authService.getRegistrationConfirm(token).subscribe(
      response => {
        this.toastr.success('You have verified your email!');
        this.router.navigate(['/']);
      },
      error => {
        this.toastr.error('Failed to confirm email!');
      }
    );
  }
}
