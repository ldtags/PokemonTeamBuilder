import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearnsetMove } from 'src/app/models/Move';
import { Pokemon, PokemonType } from 'src/app/models/Pokemon';
import { NamedAPIResource } from 'src/app/models/Utility';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent {
  @Input() public learnset? : NamedAPIResource;

  public pokemon? : Pokemon;
  public moves : LearnsetMove[] = [];
  public versionGroups : NamedAPIResource[] = [];

  constructor( private route : ActivatedRoute,
               private pokeService : PokemonService) {
    this.setPokemon();
  }

  setPokemon() : void {
    const id = this.route.snapshot.paramMap.get( 'id' );
    if ( id == null ) return;

    this.pokeService.getPokemon( id ).subscribe( ( res? : Pokemon ) => {
      this.pokemon = res;
      console.log(res);
      this.setVersionGroups();
    } );
  }

  setVersionGroups() : void {
    this.pokeService.getVersionGroups().subscribe( ( res? : NamedAPIResource[] ) => {
      if ( res ) {
        this.versionGroups = res;
        this.learnset = res[0];
        this.setMoves();
      }
    } );
  }

  setMoves() : void {
    if ( !this.pokemon || !this.learnset ) return;

    this.moves = [];
    for ( const pkmnMove of this.pokemon.moves ) {
      for ( const version of pkmnMove.version_group_details ) {
        if ( version.version_group.name == this.learnset.name ) {
          this.moves.push( {
            move : pkmnMove.move,
            version : version
          } );
        }
      }
    }
  }

  getTypes() : PokemonType[] {
    if ( this.pokemon == undefined ) return [];
    return this.pokemon.types;
  }

  formatName( name : string ) : string {
    return name.charAt(0).toUpperCase() + name.substring(1);
  }

  getHeight() : string {
    if ( !this.pokemon ) return '';

    return Math.floor( this.pokemon.height * 3.937 / 12 ) + '\' '
      + Math.floor( this.pokemon.height * 3.937 % 12 ) + '\'\'';
  }
}
