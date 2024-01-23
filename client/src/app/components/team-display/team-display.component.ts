import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TeamPokemon } from 'src/app/models/Team';

@Component({
  selector: 'app-team-display',
  templateUrl: './team-display.component.html',
  styleUrls: ['./team-display.component.css']
})
export class TeamDisplayComponent implements OnChanges {
  @Input() public team : TeamPokemon[] = new Array<TeamPokemon>(6);

  public slots : number[] = [...Array(6).keys()].map( x => x++ );

  isEmpty( slot : number ) : boolean {
    return this.team[slot] == undefined;
  }

  getSprite( slot : number ) : string {
    const pkmn = this.team[slot];
    if ( pkmn ) {
      return pkmn.pokemon.sprites.front_default;
    }
    return "";
  }

  ngOnChanges( changes: SimpleChanges ): void {
      console.log( 'change occured' );
  }
}
