import { Component, Input } from '@angular/core';
import { TeamPokemon } from 'src/app/models/Team';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  @Input() public password? : string;

  public users? : User[];
  public selectedUser? : User;

  public userTeam : TeamPokemon[] = new Array<TeamPokemon>(6);

  constructor( private authService : AuthService ) {
    this.authService.getAllUsers().subscribe( ( res? : User[] ) => {
      this.users = res;
    } );
  }

  selectUser( user : User ) : void {
    this.selectedUser = user;
    if ( user.team == null ) {
      this.userTeam = [];
    } else {
      this.userTeam = user.team;
    }
  }

  updateUser() : void {
    if ( !this.selectedUser || !this.password ) return;

    this.authService.updateUser( this.selectedUser, this.password ).subscribe( ( res? : User ) => {
      this.password = '';
      this.selectedUser = res;
    } );
  }

  isCurrentSelected() : boolean {
    if ( !this.selectedUser ) return false;

    return this.authService.isCurrentUser( this.selectedUser );
  }
}
