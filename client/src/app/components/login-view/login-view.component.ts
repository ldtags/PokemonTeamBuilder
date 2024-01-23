import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Error } from 'src/app/models/Error';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent {
  @Input() username? : string;
  @Input() password? : string;

  public error? : string;

  constructor( private router : Router, private authService : AuthService ) {}

  login() : void {
    if (this.username && this.password) {
      this.authService.login( this.username, this.password ).subscribe( ( res ) => {
        if ( res ) {
          console.log( res );
          this.username = '';
          this.password = '';
          this.error = undefined;
          this.router.navigateByUrl( 'list-view' );
        } else {
          this.error = 'unable to log in';
        }
      } );
    }
  }
}
