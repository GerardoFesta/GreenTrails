import { AttivitaService } from 'src/app/servizi/attivita.service';
import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(private attivitaService: AttivitaService, private route: ActivatedRoute) { }
  
  id: number = 0;

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.visualizzaDettagliAttivita();
  }

  visualizzaDettagliAttivita(): void {
    this.attivitaService.visualizzaAttivita(this.id).subscribe((attivita) => {
      let map: any;
      let marker: any;

      const nome = attivita.data.nome;
      const x = attivita.data.coordinate.x;
      const y = attivita.data.coordinate.y;

      map = L.map('map').setView([x, y], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      marker = L.marker([x, y]).addTo(map);
      marker.bindPopup(nome);
    }, (error) => {
      console.error(error);
    })
  }

  
}