import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-sezione1',
  templateUrl: './sezione1.component.html',
  styleUrls: ['./sezione1.component.css']
})
export class Sezione1Component implements OnInit {

        //SELECT
        selected = new FormControl(false, [Validators.required]);
        selectFormControl = new FormControl('',[Validators.required]);
        nativeSelectFormControl = new FormControl('',[Validators.required ]);
        matcher = new MyErrorStateMatcher();
  
  constructor() { }

  ngOnInit(): void {
  }

}
