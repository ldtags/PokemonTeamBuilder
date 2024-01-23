import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Constants } from 'src/app/constants/constants';
import { SimplePokemon } from 'src/app/models/Utility';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnChanges {
  @Input() public pokemon? : SimplePokemon[] = [];
  @Input() public showId : boolean = true;
  @Output() public idEmitter = new EventEmitter<string>();

  public currentView : SimplePokemon[] = [];
  public offset : number = 0;
  public limit : number = Constants.LIST_VIEW_SIZE;

  constructor() {}

  /*
    updates the list view of simple pokemon to match the current offset and limit
  */
  updateListView() : void {
    this.currentView = [];

    if ( this.pokemon ) {
      if ( this.offset + this.limit >= this.pokemon.length ) {
        this.limit = this.pokemon.length - this.offset;
      } else if ( this.pokemon.length >= Constants.LIST_VIEW_SIZE ) {
        this.limit = Constants.LIST_VIEW_SIZE;
      } else {
        this.limit = this.pokemon.length;
      }

      for ( let i = 0; i < this.limit; i++ ) {
        this.currentView.push( this.pokemon[i + this.offset] );
      }
    }
  }

  /*
    updates the limit and offset to denote the previous list of pokemon
  */
  prevList() : void {
    if ( this.isFirstList() || !this.pokemon ) return;

    if ( this.limit != Constants.LIST_VIEW_SIZE ) {
      this.limit = Constants.LIST_VIEW_SIZE;
    }

    if ( this.offset - this.limit < 0 ) {
      this.offset = 0;
    } else {
      this.offset -= this.limit;
    }
    this.updateListView();
  }

  /*
    updates the limit and offset to denote the next list of pokemon
  */
  nextList() : void {
    if ( this.isLastList() || !this.pokemon ) return;
  
    this.offset += this.limit;
    this.updateListView();
  }

  isFirstList() : boolean {
    return this.pokemon && this.pokemon.length > 0
      ? ( this.offset - this.limit ) < 0
      : true;
  }

  isLastList() : boolean {
    return this.pokemon
      ? ( this.offset + this.limit ) >= this.pokemon.length
      : true;
  }

  extractId( simpleMon : SimplePokemon ) : number {
    let id = simpleMon.url.split( '/' ).reverse()[1];
    return id.match( /^\d+$/ )
      ? parseInt( id )
      : 0;
  }

  formatId( id : string ) : string {
    for ( let i = 4 - id.length; i > 0; i-- ) {
      id = '0' + id;
    }
    return '#' + id;
  }

  formatName( name : string ) : string {
    return name.charAt(0).toUpperCase() + name.substring(1);
  }

  getViewId( index : number ) : string {
    return this.formatId( this.currentView.length > 0
                            && index < this.currentView.length
      ? this.currentView[index].id.toString()
      : '0' );
  }

  selectPokemon( id : string | number ) : void {
    if ( typeof id == 'number' ) id = id.toString();
    this.idEmitter.emit( id );
  }

  ngOnChanges( changes: SimpleChanges ): void {
    this.offset = 0;
    this.updateListView();
  }
}
