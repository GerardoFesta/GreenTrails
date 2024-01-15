import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attivita } from '../classi/attivita';

@Injectable({
  providedIn: 'root'
})
export class AttivitaService {

  private baseUrl = 'http://localhost:8080/api/attivita';

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
  //     formData.append('categoriaAlloggio', categoriaAlloggio.toString());
  //   } else {
  //     formData.append('disponibilita', disponibilita.toString());
  //     formData.append('categoriaAttivitaTuristica', categoriaAttivitaTuristica.toString());
  //   }

  //   return this.http.post<Attivita>(`${this.baseUrl}/attivita`, formData);
  // }

  visualizzaAttivita(id: number): Observable<Attivita> {
    return this.http.get<Attivita>(`${this.baseUrl}/${id}`);
  }

  visualizzaAttivitaPerGestore(): Observable<Attivita[]> {
    return this.http.get<Attivita[]>(`${this.baseUrl}`);
  }

  cancellaAttivita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
