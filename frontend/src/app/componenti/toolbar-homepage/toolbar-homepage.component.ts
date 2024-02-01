import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-homepage',
  templateUrl: './toolbar-homepage.component.html',
  styleUrls: ['./toolbar-homepage.component.css']
})
export class ToolbarHomepageComponent implements OnInit {

  isLoggedIn = false;
  isGestore = false;
  isAdmin = false;
  isVisitatore = false;

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('user') !== ''
    console.log("isLoggedIn", this.isLoggedIn);
    this.isGestore = this.cookieService.get('ruolo') === 'ROLE_GESTORE_ATTIVITA'
    this.isVisitatore = this.cookieService.get('ruolo') === 'ROLE_VISITATORE'
    console.log("isGestore", this.isGestore);
  }

  navigate() {
    if (this.isLoggedIn) this.router.navigate(['/areariservata'])
    else this.router.navigate(['/login'])
  }

}
