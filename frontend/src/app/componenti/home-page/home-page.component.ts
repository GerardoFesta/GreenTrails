import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { UploadService } from 'src/app/servizi/upload.service';
import { ModificaValoriAdminComponent } from '../modifica-valori-admin/modifica-valori-admin.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  attivitaList: any[] = [];
  fileNames: string[] = [];
  imageUrls: string[][] = [];

  limite: number = 5;
  nomeAttivita: string = 'nome';
  attivitaTuristicheList: any[] = [];
  alloggiList: any[] = [];
  attivitaPerPrezzoList: any[] = [];
  filteredAttivitaPerPrezzoList: any[] = [];


  constructor(
    private attivitaService: AttivitaService,
    private route: ActivatedRoute,
    private uploadService: UploadService,
    private router: Router, 
    private dialog: MatDialog,
    private cookieService: CookieService ){}
      
  

    ngOnInit(): void {
      Promise.all([
        this.loadDataForAttivitaPerPrezzo(5),
        this.loadDataForAlloggi(5),
        this.loadDataForAttivitaTuristiche(5)
      ]).then(() => {
        this.filterByPrezzo(); 
      });
    
    }


    loadDataForAttivitaPerPrezzo(limite: number): Promise<void> {
      return new Promise<void>((resolve) => {
        this.visualizzaListaAttivitaPerPrezzo(limite).then(() => {
          this.processMediaFiles().then(() => {
            console.log('Data loaded for AttivitaPerPrezzo:', this.attivitaPerPrezzoList);
            resolve();
          });
        });
      });
    }
  
  loadDataForAlloggi(limite: number): void {
    this.visualizzaListaAlloggi(limite).then(() => {
      this.processMediaFiles().then(() => {
        console.log('Data loaded for Alloggi:', this.alloggiList);
      });
    });
  }

  loadDataForAttivitaTuristiche(limite: number): void {
    this.visualizzaListaAttivitaTuristiche(limite).then(() => {
      this.processMediaFiles().then(() => {
        console.log('Data loaded for AttivitaTuristiche:', this.attivitaTuristicheList);
      });
    });
  }

  private visualizzaListaAttivitaPerPrezzo(limite: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.attivitaService.visualizzaAttivitaPerPrezzo(limite).subscribe(
        (result) => {
          console.log("API Response:", result);
  
          if (result.data) {
            const newAttivita = result.data;
            console.log("New Attivita from API:", newAttivita);
  
            this.attivitaPerPrezzoList.push(...newAttivita);
  
            newAttivita.forEach((item: { id: any; prezzo: { toString: () => any; }; }) => {
              this.cookieService.set(`prezzo_${item.id}`, item.prezzo.toString());
            });
  
            this.processMediaFiles().then(() => {
              console.log("Data loaded for AttivitaPerPrezzo:", this.attivitaPerPrezzoList);
              resolve();
            });
          } else {
            console.error("Unexpected API response structure:", result);
            resolve(); 
          }
        },
        (error) => {
          console.error("Error fetching AttivitaPerPrezzo:", error);
          resolve();
        }
      );
    });
  }

  private visualizzaListaAlloggi(limite: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.attivitaService.getAlloggi(limite).subscribe((result) => {
        const newAlloggi = result.data;
        this.alloggiList.push(...newAlloggi);
        resolve();
      });
    });
  }

  private visualizzaListaAttivitaTuristiche(limite: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.attivitaService.getAttivitaTuristiche(limite).subscribe((result) => {
        const newAttivitaTuristiche = result.data;
        this.attivitaTuristicheList.push(...newAttivitaTuristiche);
        resolve();
      });
    });
  }
  private processMediaFiles(): Promise<void[]> {
    const allItems = [
      ...this.attivitaList,
      ...this.alloggiList,
      ...this.attivitaTuristicheList,
      ...this.attivitaPerPrezzoList
    ];

    const promises = allItems.map((item: any) => {
      return new Promise<void>((resolve) => {
        this.uploadService.elencaFileCaricati(item.media).subscribe((listaFiles) => {
          if (listaFiles.data.length > 0) {
            const fileNames = listaFiles.data;
            const imageUrlsForItem: string[] = [];  
            const filePromises = fileNames.map((fileName: string) => {
              return new Promise<void>((fileResolve) => {
                this.uploadService.serviFile(item.media, fileName).subscribe((file) => {
                  let reader = new FileReader();
                  reader.onloadend = () => {
                    imageUrlsForItem.push(reader.result as string);
                    fileResolve();
                  };
                  reader.readAsDataURL(file);
                });
              });
            });
            Promise.all(filePromises).then(() => {
              this.imageUrls[item.id] = [...imageUrlsForItem];
              resolve();
            });
          } else {
            resolve();
          }
        });
      });
    });

    return Promise.all(promises);
  }
  private filterByPrezzo(): void {
    this.filteredAttivitaPerPrezzoList = this.attivitaPerPrezzoList.filter((item: any) => {
      const prezzoCookie = this.cookieService.get(`prezzo_${item.id}`);
      const prezzoFromCookie = parseInt(prezzoCookie, 10);
      return prezzoFromCookie < 300;
    });
    console.log("Filtered List:", this.filteredAttivitaPerPrezzoList);
  }
  shuffleArray(array: any[]): any[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  navigateToAttivita(id: number): void {
    this.router.navigate(['/attivita', id]);
    this.cookieService.set('idAttivita', JSON.stringify(id));
  }

  
}