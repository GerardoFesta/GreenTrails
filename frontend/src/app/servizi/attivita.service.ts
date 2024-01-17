import { Attivita } from 'src/app/classi/attivita';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttivitaService {

  // private baseUrl = 'http://localhost:8080/';

  // private attivitaSubject = new BehaviorSubject<Attivita | null>(null);

  // inviaAttivita(attivita: Attivita): void {
  //   this.attivitaSubject.next(attivita);
  // }

  // ottieniAttivitaCondivisa(): Observable<Attivita | null> {
  //   return this.attivitaSubject.asObservable();
  // }

  private baseUrl = 'http://localhost:3000/attivita';
  // private baseUrl= 'http://localhost:8080/attivita';

  constructor(private http: HttpClient) { }

  // creaAttivita(
  //   isAlloggio: boolean,
  //   nome: string,
  //   indirizzo: string,
  //   cap: string,
  //   citta: string,
  //   provincia: string,
  //   latitudine: number,
  //   longitudine: number,
  //   descrizioneBreve: string,
  //   descrizioneLunga: string,
  //   immagine: File,
  //   disponibilita?: number,
  //   categoriaAlloggio?: number,
  //   categoriaAttivitaTuristica?: number
  // ): Observable<Attivita> {
  //   const formData: FormData = new FormData();
  //   formData.append('alloggio', isAlloggio.toString());
  //   formData.append('nome', nome);
  //   formData.append('indirizzo', indirizzo);
  //   formData.append('cap', cap);
  //   formData.append('citta', citta);
  //   formData.append('provincia', provincia);
  //   formData.append('latitudine', latitudine.toString());
  //   formData.append('longitudine', longitudine.toString());
  //   formData.append('descrizioneBreve', descrizioneBreve);
  //   formData.append('descrizioneLunga', descrizioneLunga);
  //   formData.append('immagine', immagine);
  //   if (isAlloggio) {
  //     formData.append('categoriaAlloggio', categoriaAlloggio!.toString());
  //   } else {
  //     formData.append('disponibilita', disponibilita!.toString());
  //     formData.append('categoriaAttivitaTuristica', categoriaAttivitaTuristica!.toString());
  //   }

  //   return this.http.post<Attivita>(`${this.baseUrl}`, formData);
  // }

  // visualizzaAttivita(id: number): Observable<Attivita> {
  //   return this.http.get<Attivita>(`${this.baseUrl}/${id}`);
  // }

  // visualizzaAttivitaPerGestore(): Observable<Attivita[]> {
  //   return this.http.get<Attivita[]>(`${this.baseUrl}`);
  // }

  // cancellaAttivita(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  // }

  getListaAttivita(): Observable<Attivita[]> {
    return this.http.get<Attivita[]>(this.baseUrl);
  }

  visualizzaAttivita(id: number): Observable<Attivita> {
    return this.http.get<Attivita>(`${this.baseUrl}/${id}`);
  }
}