import { Component, OnInit } from '@angular/core';
import { RicercaService } from 'src/app/servizi/ricerca.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {
  query: string = '';
  risultatiRicerca: any[] = [];
  categorie: number[] = []
  raggio: number = 0;

  filters: any[] = [
    { id: 1, label: 'Distanza Geografica', checked: false },
    { id: 2, label: 'Categoria', checked: false },
  ];


  constructor(private ricercaService: RicercaService) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.ricercaService.cerca(this.query)
      .subscribe((risultati: any) => {
        this.risultatiRicerca = risultati.data;
        console.log(risultati)
      }, (error) => {
        console.log(error)
      });
  }
}