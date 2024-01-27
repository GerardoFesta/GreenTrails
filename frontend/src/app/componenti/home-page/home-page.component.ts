import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  }
  private visualizzaListaAttivita(idAttivita: number): void {
    this.attivitaService.visualizzaAttivita(idAttivita).subscribe((result) => {
      this.attivitaList = result.data;  // Modify this based on your API response structure

      this.processMediaFiles();
    });
  }

  private visualizzaListaAttivitaPerPrezzo(limite: number): void {
    this.attivitaService.visualizzaAttivitaPerPrezzo(limite).subscribe((result) => {
      this.attivitaList = result.data;  // Modify this based on your API response structure

      this.processMediaFiles();
    });
  }

  private visualizzaListaAlloggi(limite:number): void {
    this.attivitaService.getAlloggi(limite).subscribe((result) => {
      this.attivitaList = result.data;  // Modify this based on your API response structure

      this.processMediaFiles();
    });
  }

  private visualizzaListaAttivitaTuristiche(limite:number): void {
    this.attivitaService.getAttivitaTuristiche(limite).subscribe((result) => {
      this.attivitaList = result.data;  // Modify this based on your API response structure

      this.processMediaFiles();
    });
  }

  private processMediaFiles(): void {
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

    Promise.all(promises);
  }



}
