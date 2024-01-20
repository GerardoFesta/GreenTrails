import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sezione5',
  templateUrl: './sezione5.component.html',
  styleUrls: ['./sezione5.component.css']
})
export class Sezione5Component implements OnInit {

  @Output() formDataChanged = new EventEmitter<any>();

  descrizioneLunga = new FormControl('', [Validators.required]);
  file = new FormControl('', [Validators.required]);
  


  selectedFiles: File[] = [];
  errorMessage: string | null = null;

  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;

    // Controlla se ci sono file di tipo diverso da immagine
    const nonImageFiles: File[] = Array.from(files).filter(file => !file.type.startsWith('image/'));
    
    if (nonImageFiles.length > 0) {
      this.errorMessage = 'Puoi selezionare solo file di immagine.';
    } else {
      this.errorMessage = null;

      // Aggiungi solo i file di tipo immagine alla lista
      const imageFiles: File[] = Array.from(files).filter(file => file.type.startsWith('image/'));
      this.selectedFiles.push(...imageFiles);
    }
  }
    // Puoi aggiungere ulteriori logica qui per manipolare i file, ad esempio inviarli al server
  constructor() { }

  ngOnInit(): void {
  }


  salvaDati5() {
    const formData5 = {
      descrizioneLunga: this.descrizioneLunga.value,
      file: this.file.value
    };
  
    this.formDataChanged.emit(formData5);
  
    console.log('Dati inviati al componente padre', formData5);
  }


}
