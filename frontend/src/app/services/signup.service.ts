import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'URL_DEL_TUO_BACKEND';  

  constructor(private http: HttpClient) {}

  registerUser(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData);
  }
}
