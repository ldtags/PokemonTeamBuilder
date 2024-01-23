import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { NamedAPIResource } from 'src/app/models/Utility';
import { Pokemon } from 'src/app/models/Pokemon';
import { TeamPokemon } from 'src/app/models/Team';
import { Move } from 'src/app/models/Move';
import { Ability } from 'src/app/models/Ability';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private URL : string = Constants.API_VERSION;

  constructor( private http : HttpClient ) {}

  /*
    returns a list of detailed pokemon
      very slow, 10 pokemon takes ~ 2 seconds
  */
  public getDetailedPokemon( offset : number=0, limit : number=Constants.TOTAL_POKEMON_COUNT ) : Observable<Pokemon[]> {
    const params = new HttpParams()
      .set( 'offset', offset )
      .set( 'limit', limit );
    return this.http.get<Pokemon[]>( this.URL + '/pokemon', { params } );
  }

  public getPokemon( name : string ) : Observable<Pokemon> {
    return this.http.get<Pokemon>( this.URL + '/pokemon/' + name );
  }

  public getSimpleList( offset : number=0, limit : number=Constants.TOTAL_POKEMON_COUNT ) : Observable<NamedAPIResource[]> {
    const params = new HttpParams()
      .set( 'offset', offset )
      .set( 'limit', limit );
    return this.http.get<NamedAPIResource[]>( this.URL + '/pokemon/simple', { params } );
  }

  public getFilteredList( gen? : string, type? : string ) : Observable<NamedAPIResource[]> {
    let params = new HttpParams();
    if ( gen ) params = params.set( 'gen', gen );
    if ( type ) params = params.set( 'type', type );
    return this.http.get<NamedAPIResource[]>( this.URL + '/pokemon/filtered', { params } );
  }

  public getTypes() : Observable<NamedAPIResource[]> {
    return this.http.get<NamedAPIResource[]>( this.URL + '/types' );
  }

  public getAbility( abilityName : string ) : Observable<Ability> {
    const params = new HttpParams()
      .set( 'abilityName', abilityName );
    return this.http.get<Ability>( this.URL + '/abilities', { params } );
  }

  public getAbilities() : Observable<NamedAPIResource[]> {
    return this.http.get<NamedAPIResource[]>( this.URL + '/abilities/simple' )
  }

  public getMove( moveName : string ) : Observable<Move> {
    const params = new HttpParams()
      .set( 'moveName', moveName );
    return this.http.get<Move>( this.URL + '/moves', { params } );
  }

  public getMoves() : Observable<NamedAPIResource[]> {
    return this.http.get<NamedAPIResource[]>( this.URL + '/moves/simple' );
  }

  public getVersionGroups() : Observable<NamedAPIResource[]> {
    return this.http.get<NamedAPIResource[]>( this.URL + '/versions' );
  }

  public addToTeam( pokemon : TeamPokemon ) : Observable<TeamPokemon[]> {
    return this.http.post<TeamPokemon[]>( this.URL + '/team', { pokemon : pokemon } );
  }

  public clearTeam() : Observable<void> {
    return this.http.delete<void>( this.URL + '/team/clear' );
  }


}