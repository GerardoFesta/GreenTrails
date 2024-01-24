import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { UploadService } from 'src/app/servizi/upload.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  attivitaList: any[] = [];  // Modify the type based on your API response structure
  fileNames: string[] = [];
  imageUrls: string[] = [];

  attivita?: any;
  id: number = 0;
  limite:number = 5;

  nomeAttivita: string = 'nome';

  constructor(private attivitaService: AttivitaService, private route: ActivatedRoute, private uploadService: UploadService ) { }
  ngOnInit(): void {
    this.loadDataForAttivita(1);
    this.loadDataForAttivitaPerPrezzo(5);
    this.loadDataForAlloggi(5);
    this.loadDataForAttivitaTuristiche(5);
  }
  
  loadDataForAttivita(idAttivita: number): void {
    this.visualizzaListaAttivita(idAttivita).then(() => {
      console.log("Data loaded for Attivita:", this.attivitaList);
    });
  }
  
  loadDataForAttivitaPerPrezzo(limite: number): void {
    this.visualizzaListaAttivitaPerPrezzo(limite).then(() => {
      console.log("Data loaded for AttivitaPerPrezzo:", this.attivitaList);
    });
  }
  
  loadDataForAlloggi(limite: number): void {
    this.visualizzaListaAlloggi(limite).then(() => {
      console.log("Data loaded for Alloggi:", this.attivitaList);
    });
  }
  
  loadDataForAttivitaTuristiche(limite: number): void {
    this.visualizzaListaAttivitaTuristiche(limite).then(() => {
      console.log("Data loaded for AttivitaTuristiche:", this.attivitaList);
    });
  }
  
  private visualizzaListaAttivita(idAttivita: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.attivitaService.visualizzaAttivita(idAttivita).subscribe((result) => {
        this.attivitaList = result.data;
        this.processMediaFiles().then(() => {
          resolve();
        });
      });
    });
  }
  
  private visualizzaListaAttivitaPerPrezzo(limite: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.attivitaService.visualizzaAttivitaPerPrezzo(limite).subscribe((result) => {
        this.attivitaList = result.data;
        this.processMediaFiles().then(() => {
          resolve();
        });
      });
    });
  }
  
  private visualizzaListaAlloggi(limite: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.attivitaService.getAlloggi(limite).subscribe((result) => {
        this.attivitaList = result.data;
        this.processMediaFiles().then(() => {
          resolve();
        });
      });
    });
  }
  
  private visualizzaListaAttivitaTuristiche(limite: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.attivitaService.getAttivitaTuristiche(limite).subscribe((result) => {
        this.attivitaList = result.data;
        this.processMediaFiles().then(() => {
          resolve();
        });
      });
    });
  }
  
  private processMediaFiles(): Promise<void[]> {
    const promises = this.attivitaList.map((item: any, index: number) => {
      return new Promise<void>((resolve) => {
        this.uploadService.elencaFileCaricati(item.media).subscribe((listaFiles) => {
          if (listaFiles.data.length > 0) {
            const fileName = listaFiles.data[0];
            this.uploadService.serviFile(item.media, fileName).subscribe((file) => {
              this.fileNames.push(fileName);
  
              let reader = new FileReader();
              reader.onloadend = () => {
                this.imageUrls[index] = reader.result as string;
                resolve();
              };
              reader.readAsDataURL(file);
            });
          } else {
            resolve();
          }
        });
      });
    });
  
    return Promise.all(promises);
  }


}

