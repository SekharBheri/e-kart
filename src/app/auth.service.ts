import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject = new BehaviorSubject<any>(null); // BehaviorSubject will store the current state

  constructor() {
    // Initialize the subject with the current logged-in user (if any)
    const user = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
    this.loggedInUserSubject.next(user);
  }

  // Observable to listen for changes in the logged-in user
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  // Function to set logged-in user and trigger subscribers
  setLoggedInUser(user: any) {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    this.loggedInUserSubject.next(user);
  }

  // Function to log out and clear the session storage
  logout() {
    sessionStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null);
  }
}
