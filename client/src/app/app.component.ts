import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './services/auth/auth.service';
import { PokemonService } from './services/pokemon/pokemon.service';
import { NamedAPIResource } from './models/Utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  user? : User;

  isAuthenticated() {
    return this.user != undefined;
  }

  constructor( authService : AuthService,
               pokeService : PokemonService ) {
    authService.userSubject.subscribe( ( user: User | undefined ) => {
      this.user = user;
    } );

    pokeService.getSimpleList().subscribe( ( res? : NamedAPIResource[] ) => {
      if ( res ) {
        window.localStorage.setItem( 'pokemon', JSON.stringify( res ) );
      } else {
        window.localStorage.removeItem( 'pokemon' );
      }
    } );
  }
}
