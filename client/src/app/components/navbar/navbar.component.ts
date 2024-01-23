import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user? : User;

  constructor( private authService : AuthService, private router : Router ) {
    this.authService.userSubject.subscribe( ( user : User | undefined ) => {
      this.user = user;
    } );
  }

  isAuthenticated() : boolean {
    return this.user != undefined;
  }

  hasRole( role : string ) : boolean {
    return this.user
      ? this.user.roles.includes( role )
      : false;
  }

  showDropdown() {
    let dropdown = document.getElementById( 'nav-dropdown' );
    if ( dropdown ) {
      dropdown.hidden = false;
    }
  }

  hideDropdown() {
    let dropdown = document.getElementById( 'nav-dropdown' );
    if ( dropdown ) {
      dropdown.hidden = true;
    }
  }

  logout() {
    this.authService.logout().subscribe( ( res ) => {
      console.log( 'logout' );
      this.router.navigate( ["login-view"] );
      this.user = undefined;
    } );
  }
}
