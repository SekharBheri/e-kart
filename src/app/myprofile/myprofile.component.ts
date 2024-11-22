import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  loggedInUser: any;

  constructor(private authService: AuthService ) {
   
    
  }

  ngOnInit() {
    // Subscribe to the loggedInUser from the AuthService
    this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
    });
  }

}
