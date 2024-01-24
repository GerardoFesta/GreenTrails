// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AttivitaService } from 'src/app/servizi/attivita.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {

  listaAttivita = [{ nome: '', citta: '' }]
  filterTerm!: string;

  constructor(private attivitaService: AttivitaService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.attivitaService.findAll().subscribe((risposta) => {
      this.listaAttivita = risposta.data.map((item: any) => {
        return {
          nome: item.nome,
          citta: item.citta
        };
      });

    })
  }
}
