import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
private isLogged: boolean = false;
 
private url = 'http://localhost:8080/api/utenti';

constructor(private http: HttpClient) {}

registerUser(isGestore: boolean, dati: any, HttpHeaders = { }): Observable<any> {
  const urlWithParams = `${this.url}?isGestore=${isGestore}`;
  
  return this.http.put(urlWithParams, dati);
}

login(email: String, password: String ): Observable<any> {
  
  const base64credential = btoa(email + ":" + password);
  const headers = ({Authorization: 'Basic ' + base64credential} );


  return this.http.get<any>(`${this.url}`, {headers}).pipe(
    tap((response) => {
      this.isLogged = true;
      console.log('Login successful:', response);
    }),
    catchError((error) => {
      console.error('Error during login:', error);
      throw error;
    })
  );
}

logout(): Observable<any> {
  // Clear any session-related data or tokens on the frontend
  this.isLogged = false;

  // You might want to add a backend API endpoint to handle session invalidation
  // For simplicity, this example does not include a backend call

  return of({ success: true });
}

isLoggedInUser(): boolean {
  return this.isLogged;
}

invioQuestionario(
  viaggioPreferito: any,
  alloggioPreferito:any,
  attivitaPreferita:any,
  preferenzaAlimentare:any,
  animaleDomestico:any,
  budgetPreferito:any,
  souvenir:any,
  stagioniPreferite:any
   ): Observable<any> {
    const email = 'e@g.b';
    const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );

    const params = new HttpParams()
    .set('viaggioPreferito', viaggioPreferito)
    .set('alloggioPreferito', alloggioPreferito)
    .set('attivitaPreferita', attivitaPreferita)
    .set('preferenzaAlimentare', preferenzaAlimentare)
    .set('animaleDomestico' , animaleDomestico)
    .set('budgetPreferito', budgetPreferito)
    .set('souvenir', souvenir)
    .set('stagioniPreferite', stagioniPreferite)

    return this.http.post<any>(`${this.url}/questionario`,params, {headers});
   }


}