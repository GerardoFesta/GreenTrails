import { StudentService } from './../../../../services/student.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-politiche-ecosostenibili-attivita',
  templateUrl: './politiche-ecosostenibili-attivita.component.html',
  styleUrls: ['./politiche-ecosostenibili-attivita.component.css']
})
export class PoliticheEcosostenibiliAttivitaComponent implements OnInit {

  politicheEcosostenibili: string[] = [];

  constructor(private studentService: StudentService) { 
    // this.loadNamesAndEmails();
  }

  ngOnInit(): void {
    this.loadNames();
  }

  // loadNamesAndEmails() {
  //   this.studentService.getNamesAndEmails().subscribe((data) => {
  //     this.politicheEcosostenibili = data;
  //   }, (error) => {
  //     console.error(error);
  //   });
  // }

  loadNames() {
    this.studentService.getName().subscribe((nome) => {
      this.politicheEcosostenibili = nome;
    }, (error) => {
       console.error(error);
    })
  }

}
