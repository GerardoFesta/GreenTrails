import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
hide: any;
openBottomSheet: any;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }
  
  getErrorMessageEmail() {
    const emailControl = this.loginForm.get('email');
  
    if (emailControl) {
      if (emailControl.hasError('required')) {
        return 'Email is required';
      }
  
      if (emailControl.hasError('email')) {
        return 'Invalid email address';
      }
    }
  
    return 'Invalid email';
  }
  
  getErrorMessagePassword() {
    const passwordControl = this.loginForm.get('password');
  
    if (passwordControl) {
      if (passwordControl.hasError('required')) {
        return 'Password is required';
      }
  
      if (passwordControl.hasError('minlength')) {
        return 'Password should be at least 8 characters';
      }
    }
  
    return 'Invalid password';
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    // Simulate a simple authentication logic
    if (email === 'user@example.com' && password === 'password') {
      // Successful authentication logic (navigate to another page, set session, etc.)
      console.log('Authentication successful');
    } else {
      // Handle incorrect email or password logic (display error message, etc.)
      console.log('Incorrect email or password');
    }
  }
}