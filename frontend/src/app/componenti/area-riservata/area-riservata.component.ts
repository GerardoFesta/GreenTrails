import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.component.html',
  styleUrls: ['./area-riservata.component.css']
})
export class AreaRiservataComponent implements OnInit {
userData: any;

  constructor(
    private cookieService: CookieService,
    private route: Router,
    ) { }

  ngOnInit(): void {
    const userCookieValue = this.cookieService.get('user');

    // Controlla se il cookie "user" contiene dati
    if (userCookieValue) {
      this.userData = JSON.parse(userCookieValue);
    } else {
      console.error('Il cookie "user" non contiene dati.');
    }
  }

  clickedMieiViaggi() {
    this.route.navigate(['/tabellaP']);
  }

  clickedSuggeriti(){
    this.route.navigate(['/homepage']);
  }

  clickedQuestionario(){
    this.route.navigate(['/']); // inserire path della pagina dedicata al questionario
  }

  clickedGenera(){
    this.route.navigate(['/']); // inserire path della pagina dedicata alla generazione dell'itinerario automatico
  }

  clickedLeMieAttivita(){
    this.route.navigate(['/']); // inserire path della pagina con la lista di attività di un gestore
  }

  clickedAggiungiAttivita(){
    this.route.navigate(['/']); // inserire path per l'aggiunta di attività
  }

  clickedListaSegnalazioni(){
    this.route.navigate(['/'])// inserire path per visualizzare la lista delle segnalazioni
  }

}
