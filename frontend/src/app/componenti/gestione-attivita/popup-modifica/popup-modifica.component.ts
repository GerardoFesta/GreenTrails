import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../popup-eliminazione/popup-eliminazione.component';

@Component({
  selector: 'app-popup-modifica',
  templateUrl: './popup-modifica.component.html',
  styleUrls: ['./popup-modifica.component.css']
})
export class PopupModificaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupModificaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }
}