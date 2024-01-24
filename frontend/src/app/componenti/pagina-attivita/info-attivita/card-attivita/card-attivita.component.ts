import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupsegnalazioneComponent } from 'src/app/componenti/popupsegnalazione/popupsegnalazione.component';
import { ActivatedRoute } from '@angular/router';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { UploadService } from 'src/app/servizi/upload.service';

@Component({
  selector: 'app-card-attivita',
  templateUrl: './card-attivita.component.html',
  styleUrls: ['./card-attivita.component.css']
})
export class CardAttivitaComponent implements OnInit {

  idAttivita: number = 0;
  nomeAttivita: string = '';
  directoryAttivita: string = '';
  attivita: any;
  imageUrls: string[] = [];
  fileNames: string[] = [];

  constructor(private attivitaService: AttivitaService, private route: ActivatedRoute, private uploadService: UploadService) { }
  mostraPopup: boolean = false;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

}
