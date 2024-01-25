import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-errorPopup',
  templateUrl: './errorPopup.component.html',
  styleUrls: ['./errorPopup.component.css']
})
export class ErrorPopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ErrorPopupComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}