import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfoStepOne } from '../models/userInfoStepOne.model';
import { UserInfoStepThree } from '../models/userInfoStepThree.model';
import { PetOwnerInfo } from '../models/petOwnerInfo.model';
import { PetSitterInfo } from '../models/petSitterInfo.model';
import { ChangePassword } from '../models/changePassword.model';
import { UserServices } from '../models/userServices.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor(private http: HttpClient) {}

  public registrationStepOne(userInfo: UserInfoStepOne): Observable<any> {
    return this.http.post(environment.url + 'user/addAccountInfo', userInfo);
  }

  public getInfoRegistrationStepOne(): Observable<any> {
    return this.http.get(environment.url + 'user/getInfoStepOne');
  }

  public registrationStepTwo(userServices: UserServices): Observable<any> {
    return this.http.post(environment.url + 'user/addServicesInfo', userServices);
  }

  public getAllServices(): Observable<any> {
    return this.http.get(environment.url + 'service/getAllServices');
  }

  public getAllUserServices(): Observable<any> {
    return this.http.get(environment.url + 'service/getAllUserServices');
  }

  public getInfoRegistrationStepTwo(): Observable<any> {
    return this.http.get(environment.url + 'user/getInfoStepTwo');
  }

  public registrationStepThree(petSitterInfo: UserInfoStepThree): Observable<any> {
    return this.http.post(environment.url + 'user/addPetSitterInfo', petSitterInfo);
  }

  public getInfoRegistrationStepThree(): Observable<any> {
    return this.http.get(environment.url + 'user/getInfoStepThree');
  }

  public getProfileImage(): Observable<any> {
    return this.http.get(environment.url + 'user/getProfileImage');
  }

  public uploadProfileImage(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('profileImage', fileToUpload, fileToUpload.name);
    return this.http.post(environment.url + 'user/uploadProfileImage', formData);
  }

  public getInfoPetOwner(): Observable<any> {
    return this.http.get(environment.url + 'user/getPetOwnerInfo');
  }

  public updateInfoPetOwner(infoPetOwner: PetOwnerInfo): Observable<any> {
    return this.http.put(environment.url + 'user/updatePetOwnerProfile', infoPetOwner);
  }

  public getInfoPetSitter(): Observable<any> {
    return this.http.get(environment.url + 'user/getPetSitterInfo');
  }

  public updatePetSitterInfo(infoPetSitter: PetSitterInfo): Observable<any> {
    return this.http.put(environment.url + 'user/updatePetSitterProfile', infoPetSitter);
  }

  public getUserFirstName(): Observable<any> {
    return this.http.get(environment.url + 'user/getUserFirstName');
  }

  public updateUserPassword(infoPasswords: ChangePassword): Observable<any> {
    return this.http.put(environment.url + 'user/changePassword', infoPasswords);
  }
}
