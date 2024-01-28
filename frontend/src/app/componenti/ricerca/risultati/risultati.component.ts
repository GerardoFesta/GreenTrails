import { Component, OnInit } from '@angular/core';
import { RicercaService } from 'src/app/servizi/ricerca.service';

declare let L: any;

@Component({
  selector: 'app-risultati',
  templateUrl: './risultati.component.html',
  styleUrls: ['./risultati.component.css']
})
export class RisultatiComponent implements OnInit {


  latitudine: number = 0;
  longitudine: number = 0;
  raggio: number = 0;

  data: any;
  showmap: boolean = false;
  markers: any[] = [
    { lat: 41.9028, lng: 12.4964, name: 'Roma' },
    { lat: 45.4642, lng: 9.1900, name: 'Milano' },
    { lat: 40.8522, lng: 14.2681, name: 'Napoli' },
  ];
  map: any;

  constructor(private ricercaService: RicercaService) { }

  ngOnInit(): void {
    this.visualizzaMappa();
  }

  visualizzaMappa() {
    this.map = L.map('map').setView([40.6824408, 14.7680961], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  addMarkersToMap() {
    for (let marker of this.markers) {
      let m = L.marker([marker.lat, marker.lng]).addTo(this.map);
      m.bindPopup(marker.name);
    }
  }

  onSubmit() {

    this.ricercaService.cerca(this.latitudine, this.longitudine, this.raggio).subscribe((results) => {
      console.log('Search Results:', results);
    });
    this.addMarkersToMap();
  }
}
