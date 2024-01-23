import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { NamedAPIResource, SimplePokemon } from 'src/app/models/Utility';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  @Input() public name? : string;
  @Input() public originGen? : string;
  @Input() public type? : string;

  public types? : string[] = [];
  public pokemon? : SimplePokemon[] = [];

  constructor( private pokeService : PokemonService,
               private router : Router ) {}

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

  createNameList( resourceList? : NamedAPIResource[] ) : string[] {
    let nameList : string[] = [];
    if ( resourceList ) {
      for ( const resource of resourceList ) {
        nameList.push( resource.name );
      }
    }
    return nameList;
  }

  filterByName() : void {
    if ( this.name && this.pokemon ) {
      this.pokemon = this.pokemon.filter( ( pkmn ) => pkmn.name.includes( this.name?.toLowerCase() as string ) );
    }
  }

  /*
    sets the pokemon list of the component to a list of pokemon that satisfy the filter parameters
    the list of filtered pokemon is obtained from the server
      if the response is an empty list, the current list of pokemon is filtered by name
  */
  filterPokemon() : void {
    if ( !this.pokemon ) return;

    if ( this.type == 'undefined' ) this.type = undefined;
    this.pokeService.getFilteredList( this.originGen, this.type )
      .subscribe( ( res? : NamedAPIResource[] ) => {
        if ( res ) {
          if ( res.length > 0 ) {
            this.pokemon = this.createSimpleList( res );
            this.pokemon.sort( ( ( pkmn1, pkmn2 ) => {
              return pkmn1.id - pkmn2.id;
            } ) );
          } else {
            this.setAllPokemon();
          }
          this.filterByName();
        }
      } );
  }

  /*
    sets the components pokemon to a list of all pokemon
    sets the offset and limit to their defaults
  */
  resetPokemon() : void {
    this.type = undefined;
    this.name = undefined;
    this.originGen = undefined;
    this.setAllPokemon();
  }

  /*
    sets the pokemon of the component to a list of every pokemon
    checks for a list of all pokemon stored in the browser
      if that list isn't present, a list of all pokemon is obtained from the server
        if the response is undefined, the pokemon list is set to an empty list
  */
  setAllPokemon() : void {
    const storedPkmn = window.localStorage.getItem( 'pokemon' );
    if ( storedPkmn ) {
      const resourceList = JSON.parse( storedPkmn ) as NamedAPIResource[];
      this.pokemon = this.createSimpleList( resourceList );
    } else {
      this.pokeService.getSimpleList().subscribe( ( res? : NamedAPIResource[] ) => {
        if ( res ) {
          this.pokemon = this.createSimpleList( res );
        } else {
          this.pokemon = [];
        }
      } );
    }
  }

  /*
    loads a list of types, obtained from the backend, into this component
  */
  setTypes() : void {
    this.pokeService.getTypes().subscribe( ( res? : NamedAPIResource[] ) => {
      this.types = this.createNameList( res );
    } );
  }

  /*
    updates the primary type to match the current state of the primary type filter
  */
  setType( type : string ) : void {
    this.type = type;
  }

  formatName( name : string ) : string {
    return name.charAt(0).toUpperCase() + name.substring(1);
  }

  selectPokemon( id : string ) : void {
    this.router.navigate( ['detailed-view', id] );
  }

  ngOnInit() : void {
      this.setAllPokemon();
      this.setTypes();
  }
}
