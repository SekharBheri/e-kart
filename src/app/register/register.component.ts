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

  constructor(private router: Router) {}

  onRegister() {
    // Reset previous validation state
    let validationErrors = '';

    // 1. First Name and Last Name Validation (only alphabet characters)
    const namePattern = /^[a-zA-Z]+$/;
    if (!namePattern.test(this.firstName)) {
      validationErrors += 'First Name should contain only alphabetic characters.\n';
    }
    if (!namePattern.test(this.lastName)) {
      validationErrors += 'Last Name should contain only alphabetic characters.\n';
    }

    // 2. Email Validation (Check for email format and duplication)
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(this.email)) {
      validationErrors += 'Please enter a valid email.\n';
    } else {
      // Check if the email is already registered
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const emailAlreadyRegistered = users.some((user: { email: string }) => user.email === this.email);
      if (emailAlreadyRegistered) {
        validationErrors += 'This email is already registered.\n';
      }
    }

    // 3. Password Validation (Minimum 6 characters with at least 1 letter, 1 number, 1 special character)
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordPattern.test(this.password)) {
      validationErrors += 'Password must be at least 6 characters long, contain at least one letter, one number, and one special character.\n';
    }

    // If there are validation errors, show them in an alert
    if (validationErrors) {
      alert(validationErrors);
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

    // Redirect to login page after successful registration
    this.router.navigate(['/login']);
  }
}
