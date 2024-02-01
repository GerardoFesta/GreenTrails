import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { UploadService } from 'src/app/servizi/upload.service';
import { UtenteService } from 'src/app/servizi/utente.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
//   attivitaList: any[] = [];  // Modify the type based on your API response structure

//   fileNames: string[] = [];
//   imageUrls: string[] = [];

//   attivita?: any;
//   id: number = 0;
//   limite:number = 5;

//   nomeAttivita: string = 'nome';

//   constructor(private attivitaService: AttivitaService, private route: ActivatedRoute, private uploadService: UploadService ) { }
//   ngOnInit(): void {

//   }
//   private visualizzaListaAttivita(idAttivita: number): void {
//     this.attivitaService.visualizzaAttivita(idAttivita).subscribe((result) => {
//       this.attivitaList = result.data;  // Modify this based on your API response structure

//       this.processMediaFiles();
//   constructor(
//     private attivitaService: AttivitaService,
//     private route: ActivatedRoute,
//     private uploadService: UploadService,
//     private router: Router, 
//     private userService: UtenteService,
//     private cookieService: CookieService ){}
      
  

//     ngOnInit(): void {
//       Promise.all([
//         this.loadDataForAttivitaPerPrezzo(5),
//         this.loadDataForAlloggi(5),
//         this.loadDataForAttivitaTuristiche(5)
//       ]).then(() => {
//         this.filterByPrezzo(); // Call the filter method after loading data
//       });
    
//     }


//     loadDataForAttivitaPerPrezzo(limite: number): Promise<void> {
//       return new Promise<void>((resolve) => {
//         this.visualizzaListaAttivitaPerPrezzo(limite).then(() => {
//           this.processMediaFiles().then(() => {
//             console.log('Data loaded for AttivitaPerPrezzo:', this.attivitaPerPrezzoList);
//             resolve();
//           });
//         });
//       });
//     }
  
//   loadDataForAlloggi(limite: number): void {
//     this.visualizzaListaAlloggi(limite).then(() => {
//       this.processMediaFiles().then(() => {
//         console.log('Data loaded for Alloggi:', this.alloggiList);
//       });
//     });
//   }

//   private visualizzaListaAttivitaPerPrezzo(limite: number): void {
//     this.attivitaService.visualizzaAttivitaPerPrezzo(limite).subscribe((result) => {
//       this.attivitaList = result.data;  // Modify this based on your API response structure

//       this.processMediaFiles();
//     });
//   }

//   private visualizzaListaAlloggi(limite:number): void {
//     this.attivitaService.getAlloggi(limite).subscribe((result) => {
//       this.attivitaList = result.data;  // Modify this based on your API response structure

//       this.processMediaFiles();
//     });
//   }

//   private visualizzaListaAttivitaTuristiche(limite:number): void {
//     this.attivitaService.getAttivitaTuristiche(limite).subscribe((result) => {
//       this.attivitaList = result.data;  // Modify this based on your API response structure

//       this.processMediaFiles();
//   private visualizzaListaAttivitaPerPrezzo(limite: number): Promise<void> {
//     return new Promise<void>((resolve) => {
//       this.attivitaService.visualizzaAttivitaPerPrezzo(limite).subscribe(
//         (result) => {
//           console.log("API Response:", result);
  
//           if (result.data) {
//             const newAttivita = result.data;
//             console.log("New Attivita from API:", newAttivita);
  
//             const filteredAttivita = newAttivita.filter((item: { id: any; prezzo: number; }) => item.prezzo < 300);
  
//             this.attivitaPerPrezzoList.push(...filteredAttivita);
  
//             this.processMediaFiles().then(() => {
//               console.log("Data loaded for AttivitaPerPrezzo:", this.attivitaPerPrezzoList);
//               resolve();
//             });
//           } else {
//             console.error("Unexpected API response structure:", result);
//             resolve();
//           }
//         },
//         (error) => {
//           console.error("Error fetching AttivitaPerPrezzo:", error);
//           resolve();
//         }
//       );
//     });
//   }
//   private visualizzaListaAlloggi(limite: number): Promise<void> {
//     return new Promise<void>((resolve) => {
//       this.attivitaService.getAlloggi(limite).subscribe((result) => {
//         const newAlloggi = result.data;
//         this.alloggiList.push(...newAlloggi);
//         resolve();
//       });
//     });
//   }

//   private processMediaFiles(): void {
//     const promises = this.attivitaList.map((item: any, index: number) => {
//       return new Promise<void>((resolve) => {
//         this.uploadService.elencaFileCaricati(item.media).subscribe((listaFiles) => {
//           if (listaFiles.data.length > 0) {
//             const fileName = listaFiles.data[0];
//             this.uploadService.serviFile(item.media, fileName).subscribe((file) => {
//               this.fileNames.push(fileName);

//               let reader = new FileReader();
//               reader.onloadend = () => {
//                 this.imageUrls[index] = reader.result as string;
//                 resolve();
//               };
//               reader.readAsDataURL(file);
//             });
//           } else {
//             resolve();
//           }
//         });
//       });
//     });

//     Promise.all(promises);
//   }



// }
//     return Promise.all(promises);
//   }
//   private filterByPrezzo(): void {
//     this.filteredAttivitaPerPrezzoList = this.attivitaPerPrezzoList.filter((item: { prezzo: number }) => {
//       return item.prezzo < 300;
//     });
//     console.log("Filtered List:", this.filteredAttivitaPerPrezzoList);
//   }
//   shuffleArray(array: any[]): any[] {
//     const shuffledArray = [...array];
//     for (let i = shuffledArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//     }
//     return shuffledArray;
//   }

//   navigateToAttivita(id: number): void {
//     this.router.navigate(['/attivita', id]);
//     this.cookieService.set('idAttivita', JSON.stringify(id));
//   }
//   logout() {
//     this.userService.logout().subscribe(
//       (response) => {
//         console.log('Logout eseguito con successo:', response);
//         // Aggiungi qui la logica aggiuntiva, se necessario
//       },
//       (error) => {
//         console.error('Errore durante il logout:', error);
//         // Gestisci l'errore se necessario
//       }
//     );
//   }
}
