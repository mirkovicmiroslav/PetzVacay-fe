import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/register.model';
import { Login } from '../models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  constructor(private http: HttpClient) {}

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public isPetSitter() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getToken());

    if (decodedToken != null) {
      for (let role of decodedToken.roles) {
        if (role.authority === 'PET SITTER') {
          return true;
          break;
        }
      }
    }
    return false;
  }

  public isAdmin() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getToken());

    if (decodedToken != null) {
      for (let role of decodedToken.roles) {
        if (role.authority === 'ADMIN') {
          return true;
          break;
        }
      }
    }
    return false;
  }

  public login(loginData: Login): Observable<any> {
    return this.http.post(environment.url + 'login', loginData);
  }

  public register(userData: User): Observable<any> {
    return this.http.post(environment.url + 'register', userData);
  }

  public forgotPassword(email: String): Observable<any> {
    return this.http.get(environment.url + 'forgotPassword/' + email);
  }

  public getRegistrationConfirm(token: String): Observable<any> {
    return this.http.get(environment.url + 'registrationConfirm/' + token);
  }
}
