import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-passwordDimenticata',
  templateUrl: './passwordDimenticata.component.html',
  styleUrls: ['./passwordDimenticata.component.css']
})


export class PasswordDimenticataComponent implements OnInit {

conferma: any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordDimenticataComponent,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
  }

}

export class DialogOverviewExampleDialog {
  static dialogRef: any;

}