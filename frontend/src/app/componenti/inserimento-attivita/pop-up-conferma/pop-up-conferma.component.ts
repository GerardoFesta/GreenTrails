import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-conferma',
  templateUrl: './pop-up-conferma.component.html',
  styleUrls: ['./pop-up-conferma.component.css']
})
export class PopUpConfermaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopUpConfermaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/tabellaPrenotazioni'])
  }

  
  
}