import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtInitiationDemographics } from '../models/art-initiation-demographics';

@Injectable({
  providedIn: 'root'
})
export class ArtInitiationService {

  private apiUrl = 'http://localhost:8081/api/art-register/group-age';

  constructor(private http: HttpClient) {}

  // Helper method to get headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }  

  getArtInitiationDemographics(): Observable<ArtInitiationDemographics> {
    return this.http.get<ArtInitiationDemographics>(this.apiUrl, { headers: this.getHeaders() });
  }
}
