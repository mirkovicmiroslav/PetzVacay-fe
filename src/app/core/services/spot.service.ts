import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpotInfo } from '../models/spotInfo.model';

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  constructor(private http: HttpClient) {}

  public getAllSpots(): Observable<any> {
    return this.http.get(environment.url + 'spot/getAll');
  }

  public addSpot(spotInfo: SpotInfo): Observable<any> {
    return this.http.post(environment.url + 'spot/add', spotInfo);
  }

  public getUserSpotsByDate(date): Observable<any> {
    return this.http.get(environment.url + 'spot/getUserSpotsByDate/' + date);
  }

  public getSingleSpot(idSpot): Observable<any> {
    return this.http.get(environment.url + 'spot/getSingleSpot/' + idSpot);
  }

  public updateSpot(spotInfo: SpotInfo, idSpot): Observable<any> {
    return this.http.put(environment.url + 'spot/updateSpot/' + idSpot, spotInfo);
  }

  public deleteSpot(idSpot): Observable<any> {
    return this.http.get(environment.url + 'spot/delete/' + idSpot);
  }
}
