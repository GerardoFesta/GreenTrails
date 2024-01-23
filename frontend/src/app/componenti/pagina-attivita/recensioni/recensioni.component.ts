import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RecensioneService } from 'src/app/servizi/recensione.service';
import { UploadService } from 'src/app/servizi/upload.service';
import { GalleryDialogComponent } from './gallery-dialog/gallery-dialog.component';

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrls: ['./recensioni.component.css'],
  providers: [NgbRatingConfig],
})
export class RecensioniComponent implements OnInit {

  constructor(public dialog: MatDialog, config: NgbRatingConfig, private recensioneService: RecensioneService, private route: ActivatedRoute,
    private uploadService: UploadService) {
    config.max = 5;
    config.readonly = true;
  }

  recensioni: any;
  idAttivita: number = 0;
  hasRecensione: boolean = false;
  imageUrls: string[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idAttivita = +params['id'];
    })

    this.visualizzaListaRecensioni();
  }

  visualizzaListaRecensioni(): void {
    this.recensioneService.visualizzaRecensioniPerAttivita(this.idAttivita).subscribe((recensione) => {
      this.recensioni = recensione.data;
      console.log("Lista recensioni: ", this.recensioni);

      const promises = this.recensioni.map((item: any, index: number) => {
        return new Promise<void>((resolve) => {
          this.uploadService.elencaFileCaricati(item.media).subscribe((listaFiles) => {
            this.uploadService.serviFile(item.media, listaFiles.data).subscribe((image) => {
              let reader = new FileReader();
              reader.onloadend = () => {
                this.imageUrls[index] = reader.result as string;
                resolve();
              };
              reader.readAsDataURL(image);
            });
          });
        });
      });

      Promise.all(promises).then(() => {
        this.hasRecensione = this.recensioni.some((item: any) => item.visitatore.email === 'giuseppe@simone.com');
      });
    });
  }

  openDialogue(index: number) {
    const dialogRef = this.dialog.open(GalleryDialogComponent, {
      data: {
        image: this.imageUrls[index]
      }
    });
  }
}
