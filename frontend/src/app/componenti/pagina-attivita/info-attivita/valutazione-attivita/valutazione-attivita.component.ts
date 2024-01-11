import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-valutazione-attivita',
  templateUrl: './valutazione-attivita.component.html',
  styleUrls: ['./valutazione-attivita.component.css']
})
export class ValutazioneAttivitaComponent {

  @Input() preselectedRating: number = 3;
  maxRating: number = 5;
  ratings: number[] = [];

  ngOnInit() {
    this.generateRatings();
  }

  private generateRatings(): void {
    for (let i = 1; i <= this.maxRating; i++) {
      this.ratings.push(i);
    }
  }

}
