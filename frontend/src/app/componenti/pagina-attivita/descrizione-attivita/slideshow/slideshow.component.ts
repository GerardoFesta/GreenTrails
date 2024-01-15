import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  images = [
    {name: 'hotel.jpg', caption: 'hotel'},
    {name: 'palestra.jpg', caption: 'Palestra'},
    {name: 'piscina.jpg', caption: 'Piscina'},
    {name: 'ristorante.jpg', caption: 'Ristorante'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
