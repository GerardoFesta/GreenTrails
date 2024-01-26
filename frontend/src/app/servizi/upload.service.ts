import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private baseUrl = 'http://localhost:8080/api/file';

  constructor(private http: HttpClient) { }

  elencaFileCaricati(media: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${media}`);
  }

  serviFile(media: string, filename: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${media}/${filename}`, { responseType: 'blob' });
  }
}
