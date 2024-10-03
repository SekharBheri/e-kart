import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';

  firstNameError = '';
  lastNameError = '';
  emailError = '';
  passwordError = '';

  constructor(private router: Router) {}

  onRegister() {
    // Reset previous validation state
    this.firstNameError = '';
    this.lastNameError = '';
    this.emailError = '';
    this.passwordError = '';

    // 1. First Name and Last Name Validation
    const namePattern = /^[a-zA-Z]+$/;
    if (!namePattern.test(this.firstName)) {
      this.firstNameError = 'First Name should contain only alphabetic characters.';
    }
    if (!namePattern.test(this.lastName)) {
      this.lastNameError = 'Last Name should contain only alphabetic characters.';
    }

    // 2. Email Validation
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(this.email)) {
      this.emailError = 'Please enter a valid email.';
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const emailAlreadyRegistered = users.some((user: { email: string }) => user.email === this.email);
      if (emailAlreadyRegistered) {
        this.emailError = 'This email is already registered.';
      }
    }

    // 3. Password Validation
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordPattern.test(this.password)) {
      this.passwordError = 'Password must be at least 6 characters long, contain at least one letter, one number, and one special character.';
    }

    // If there are validation errors, return
    if (this.firstNameError || this.lastNameError || this.emailError || this.passwordError) {
      return;
    }

    // Proceed with registration if there are no validation errors
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message
    alert('Registration Successful Please login to continue.');
    this.router.navigate(['/login']);
  }
}
