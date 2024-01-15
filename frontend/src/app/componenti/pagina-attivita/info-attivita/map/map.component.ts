import { AfterViewInit, Component, OnInit } from '@angular/core';

declare let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor() { }

  map: any;
  marker: any;
  popup: any;
  nomeHotel: string = 'nomeAttivita';

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([41.8919300, 12.5113300], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(this.map);

  this.marker = L.marker([41.8919300, 12.5113300]).addTo(this.map);
  this.marker.bindPopup(this.nomeHotel); // Aggiungi questa riga
  }

  ngOnInit() {
  }

  onMarkerCLick(e: any) {
    this.popup.setLatLng(e.latlng);
  }
}