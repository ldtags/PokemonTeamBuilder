import { Ability } from "./Ability";
import { Move } from "./Move";
import { Pokemon } from "./Pokemon";

export interface Team {
    pokemon : TeamPokemon[]
}

export interface TeamPokemon {
    pokemon : Pokemon,
    moves : Move[],
    ability : Ability
}