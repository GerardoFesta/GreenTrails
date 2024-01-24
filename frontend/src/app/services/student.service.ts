import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/v1/utenti'

  constructor(private http: HttpClient) { }

  getEmail(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/email`);
  }

  getName(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/names`);
  }
  
}

