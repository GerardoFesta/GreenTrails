import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttivitaService } from 'src/app/servizi/attivita.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  attivita?: any;
  id: number = 0;

  nomeAttivita: string = 'nome';
  immagine_attivita: string = 'https://www.hotelkennedy.org/static/f9f7a02b44b26255144bc1b4086fbd1e/5267c/e825f4c8-e7d7-4693-9895-b012d2879684.jpg';

  constructor(private attivitaService: AttivitaService, private route: ActivatedRoute ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.getInfo();
  }

  getInfo(){
    this.attivitaService.visualizzaAttivita(this.id).subscribe((attivita) => {
      this.attivita = attivita.data;
      console.log(this.attivita);
    }, (error) => {
      console.error(error);
    })
  }


}
