import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrazioneService {
 

  constructor(private http: HttpClient) {}

  registerUser(baseUrl: string, userData:{}): Observable<any> {
    return this.http.post(baseUrl, userData);
  }

}