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

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('user') !== ''
    console.log("isLoggedIn", this.isLoggedIn);
    this.isGestore = this.cookieService.get('ruolo') === 'ROLE_GESTORE_ATTIVITA'
    console.log("isGestore", this.isGestore);
    this.encodeAmministratore();
  }

  navigate() {
    if (this.isLoggedIn) this.router.navigate(['/areariservata'])
    else this.router.navigate(['/login'])
  }

  encodeAmministratore() {
    let email = 'amministratorer@amministratore.com';
    let password = 'ciaozio123@';

    let encodedCredentials = btoa(email + ":" + password);
    console.log('Authorization: Basic ' + encodedCredentials);
  }

}
