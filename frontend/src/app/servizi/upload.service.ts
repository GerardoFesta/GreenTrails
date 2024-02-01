import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private baseUrl = 'http://localhost:8080/api/file';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  elencaFileCaricati(media: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
    });
    return this.http.get<any>(`${this.baseUrl}/${media}`, {headers});
  }

  serviFile(media: string, filename: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${media}/${filename}`, { responseType: 'blob' });
  }
}
