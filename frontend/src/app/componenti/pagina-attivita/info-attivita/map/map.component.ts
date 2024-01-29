import { AttivitaService } from 'src/app/servizi/attivita.service';
import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RicercaService } from 'src/app/servizi/ricerca.service';

declare let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private attivitaService: AttivitaService, private route: ActivatedRoute, private ricercaService: RicercaService) { }

  id: number = 0;
  markers: any[] = [];

  greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

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

      map = L.map('map').setView([x, y], 7);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      marker = L.marker([x, y], {icon: this.greenIcon}).addTo(map);
      marker.bindPopup(`<p style="color: #32CD32; font-weight: bold">${nome}</p>`)

      this.ricercaService.cercaPerPosizione(x, y, 50 * 1000).subscribe((risposta) => {
        this.markers = risposta.data.map((item: any) => {
          return {
            id: item.id,
            lat: item.coordinate.x,
            lng: item.coordinate.y,
            name: item.nome
          };
        });
        this.addMarkersToMap(map, x, y);
      }, (error) => {
        console.error(error)
      })

    }, (error) => {
      console.error(error);
    })
  }

  addMarkersToMap(map: any, x: number, y: number) {
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    for (let marker of this.markers) {
      let icon = this.greenIcon;
      let color = '#32CD32';
      if (marker.lat !== x || marker.lng !== y) {
        icon = this.goldIcon;
        color = '#FFD700';
      }
      let m = L.marker([marker.lat, marker.lng], { icon: icon }).addTo(map);
      m.bindPopup(`<a href="/attivita/${marker.id}" style="text-decoration: none; color: ${color}; font-weight: bold">${marker.name}</a>`);
    }
  }
}
