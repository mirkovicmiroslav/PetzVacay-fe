import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminManagementService {
  constructor(private http: HttpClient) {}

  public addServiceType(description: String): Observable<any> {
    return this.http.get(environment.url + 'service/createServiceType/' + description);
  }
}
