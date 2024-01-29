import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-popup-eliminazione',
  templateUrl: './popup-eliminazione.component.html',
  styleUrls: ['./popup-eliminazione.component.css']
})
export class PopupEliminazioneComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupEliminazioneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
      
  }

}
