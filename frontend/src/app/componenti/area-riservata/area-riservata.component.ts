import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.component.html',
  styleUrls: ['./area-riservata.component.css']
})
export class AreaRiservataComponent implements OnInit {
userData: any;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    const userCookieValue = this.cookieService.get('user');

    // Controlla se il cookie "user" contiene dati
    if (userCookieValue) {
      this.userData = JSON.parse(userCookieValue);
    } else {
      console.error('Il cookie "user" non contiene dati.');
    }
  }

}
