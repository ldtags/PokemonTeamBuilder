import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { NamedAPIResource, SimplePokemon } from 'src/app/models/Utility';
import { Pokemon } from 'src/app/models/Pokemon';
import { TeamPokemon } from 'src/app/models/Team';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Move } from 'src/app/models/Move';
import { Ability } from 'src/app/models/Ability';

@Component({
  selector: 'app-team-builder-view',
  templateUrl: './team-builder-view.component.html',
  styleUrls: ['./team-builder-view.component.css']
})
export class TeamBuilderViewComponent implements OnInit {
  @Input() public search? : string;

  public user? : User;
  public pokemon? : SimplePokemon[] = [];
  public selectedPokemon? : Pokemon;
  public moves? : NamedAPIResource[] = [];
  public selectedMoves : Move[] = new Array<Move>(4);
  public abilities? : NamedAPIResource[] = [];
  public selectedAbility? : Ability;
  public spriteUrl? : string;
  public currentTeam : TeamPokemon[] = [];

  constructor( private pokeService : PokemonService,
               private authService : AuthService ) {
    this.authService.userSubject.subscribe( ( user : User | undefined ) => {
      this.user = user;
    } );
  }

  formatName( name : string ) : string {
    return name.charAt(0).toUpperCase() + name.substring(1);
  }

  extractId( simpleMon : NamedAPIResource ) : number {
    let id = simpleMon.url.split( '/' ).reverse()[1];
    return id.match( /^\d+$/ )
      ? parseInt( id )
      : 0;
  }

  createSimpleList( resourceList : NamedAPIResource[] ) : SimplePokemon[] {
    let simpleList : SimplePokemon[] = [];
    for ( const resource of resourceList ) {
      let pkmn = resource as SimplePokemon;
      pkmn.id = this.extractId( resource );
      if ( pkmn.id <= Constants.TOTAL_POKEMON_COUNT ) {
        simpleList.push( pkmn );
      }
    }
    return simpleList;
  }

  /*
    sets the pokemon of the component to a list of every pokemon
    checks for a list of all pokemon stored in the browser
      if that list isn't present, a list of all pokemon is obtained from the server
        if the response is undefined, the pokemon list is set to an empty list
  */
  getSimpleList() : SimplePokemon[] {
    let simplePokemon : SimplePokemon[] = [];
    const storedPkmn = window.localStorage.getItem( 'pokemon' );
    if ( storedPkmn ) {
      const resourceList = JSON.parse( storedPkmn ) as NamedAPIResource[];
      simplePokemon = this.createSimpleList( resourceList );
    } else {
      this.pokeService.getSimpleList().subscribe( ( res? : NamedAPIResource[] ) => {
        if ( res ) {
          simplePokemon = this.createSimpleList( res );
        }
      } );
    }
    return simplePokemon;
  }

  /*
    sets the pokemon of the component to a list of every pokemon
    checks for a list of all pokemon stored in the browser
      if that list isn't present, a list of all pokemon is obtained from the server
        if the response is undefined, the pokemon list is set to an empty list
  */
  setAllPokemon() : void {
    this.pokemon = this.getSimpleList();
  }

  onSearchChange( event : Event ) : void {
    const searchValue = (event.target as HTMLInputElement).value;
    if ( searchValue == undefined ) {
      this.setAllPokemon();
    } else if ( this.pokemon ) {
      this.pokemon = this.getSimpleList()
                         .filter( ( pkmn ) => pkmn.name.includes( searchValue ) );
    }
  }

  setMove( move : string, slot : number ) : void {
    if ( slot < 0 || slot > 3 ) return;

    this.pokeService.getMove( move ).subscribe( ( res? : Move ) => {
      if ( res ) {
        this.selectedMoves[slot] = res;
      }
    } );
  }

  setMoves( pkmn : Pokemon ) : void {
    this.moves = [];
    for ( const pkmnMove of pkmn.moves ) {
      this.moves?.push( pkmnMove.move );
    }
  }

  setAbility( ability : string ) : void {
    this.pokeService.getAbility( ability ).subscribe( ( res? : Ability ) => {
      this.selectedAbility = res;
    } );
  }

  setAbilities( pkmn : Pokemon ) : void {
    this.abilities = [];
    for ( const pkmnAbility of pkmn.abilities ) {
      this.abilities?.push( pkmnAbility.ability );
    }
  }

  setSprite( pkmn : Pokemon ) : void {
    this.spriteUrl = pkmn.sprites.front_default;
  }

  selectPokemon( id : string ) : void {
    this.pokeService.getPokemon( id ).subscribe( ( res? : Pokemon ) => {
      if ( res ) {
        this.selectedPokemon = res;
        this.setMoves( res );
        this.setAbilities( res );
        this.setSprite( res );
      }
    } );
  }

  getDetailedMove( moveName : string ) : Move | undefined {
    this.pokeService.getMove( moveName ).subscribe( ( res? : Move ) => {
      return res;
    } );
    return undefined;
  }

  updateTeam( pkmn : TeamPokemon ) : void {
    this.pokeService.addToTeam( pkmn ).subscribe( ( res? : TeamPokemon[] ) => {
      if ( res ) {
        this.currentTeam = res;
        if ( this.user ) {
          this.user.team = res;
          this.authService.setUser( this.user );
        }
      }
    } );
  }

  clearTeam() : void {
    this.pokeService.clearTeam().subscribe( () => {
      this.currentTeam = [];
      if ( this.user ) {
        this.user.team = [];
        this.authService.setUser( this.user );
      }
    } );
  }

  addToTeam() : void {
    if ( this.currentTeam.length > 6
          || !this.selectedPokemon
          || !this.selectedAbility
          || this.selectedMoves.length < 1 ) {
        return;
    }

    this.updateTeam( {
      pokemon : this.selectedPokemon,
      moves : this.selectedMoves,
      ability : this.selectedAbility
    } );
  }

  ngOnInit() : void {
    this.setAllPokemon();
    console.log( this.user );
    if ( this.user && this.user.team ) {
      this.currentTeam = this.user.team;
    }
  }
}
