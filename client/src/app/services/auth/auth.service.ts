import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private URL : string = Constants.API_VERSION;
  private user? : User = undefined;
  public userSubject : BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>( undefined );

  constructor( private http : HttpClient ) {
    this.ngOnInit();
  }

  isAuthenticated() : boolean {
    return this.user != undefined;
  }

  isCurrentUser( user : User ) : boolean {
    return user === this.user;
  }

  /*
    @user -> either a User object defining the current session user or undefined

    updates the service user and browser user to match @user
  */
  setUser( user? : User ) : void {
    if ( user ) {
      user.password = '';
      window.localStorage.setItem( 'user', JSON.stringify( user ) );
      this.user = user;
      this.userSubject.next( user );
    } else {
      window.localStorage.removeItem( 'user' );
    }
  }

  /*
    returns the authenticated user of the current session and sets
      the current user of the model to said authenticated user
  */
  getSessionUser() : Observable<User> {
    const user = window.localStorage.getItem( 'user' );
    if ( user ) {
      let userJSON : User = JSON.parse( user ) as User;
      this.setUser( userJSON );
      return of( userJSON );
    }
    return this.http
      .get<User>( this.URL + '/user' )
      .pipe( tap( user => this.setUser( user ) ) );
  }

  getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>( this.URL + '/user/all' );
  }

  updateUser( user : User, password : string ) : Observable<User> {
    const params = {
      username : user.username,
      password : password
    }
    return this.http.put<User>( this.URL + '/user/update', params );
  }

  login( email : string, password : string ) : Observable<User> {
    const params = {
      username : email,
      password : password
    }
    return this.http
      .post<User>( this.URL + "/login", null, { params } )
      .pipe<User>( tap( user => this.setUser( user ) ) );
  }

  logout() : Observable<User>{
    return this.http
      .post<User>( this.URL + "/logout", {} )
      .pipe( tap( () => this.setUser( undefined ) ) );
  }

  ngOnInit() : void {
    this.getSessionUser().subscribe();
  }
}
