import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sezione4',
  templateUrl: './sezione4.component.html',
  styleUrls: ['./sezione4.component.css']
})
export class Sezione4Component implements OnInit {

  @Output() formDataChanged = new EventEmitter<any>();

  descrizioneBreve = new FormControl('', [Validators.required]);
  prezzo = new FormControl('', [Validators.required]);




  constructor() { }

  ngOnInit(): void {
  }
  salvaDati4() {
    const formData4 = {
      descrizioneBreve: this.descrizioneBreve.value,
      prezzo: this.prezzo.value
    };
  
    this.formDataChanged.emit(formData4);
  
    console.log('Dati inviati al componente padre', formData4);
  }
}
