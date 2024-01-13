import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/v1/student'

  constructor(private http: HttpClient) { }

  getNamesAndEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/names-emails`);
  }

  getName(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/names`);
  }
  
}
