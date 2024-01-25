import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-popuo',
  templateUrl: './success-popuo.component.html',
  styleUrls: ['./success-popuo.component.css']
})
export class SuccessPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessPopupComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
