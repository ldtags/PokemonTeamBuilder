import { NamedAPIResource, VersionGameIndex } from "./Utility"
import { Type } from "./Type"

export interface Pokemon {
    id : number,
    name : string,
    base_experience : number,
    height : number,
    order : number,
    weight : number,
    abilities : PokemonAbility[],
    forms : NamedAPIResource[],
    game_indices : VersionGameIndex[],
    held_items : PokemonHeldItem[],
    location_area_encounters : string,
    moves : PokemonMove[],
    past_types : PokemonTypePast[],
    sprites : Sprites,
    species : NamedAPIResource,
    stats : PokemonStat[],
    types : PokemonType[]
}

export interface DetailedPokemon extends Pokemon {
    detailedTypes : Type[],
    prevEvolution? : Pokemon,
    nextEvolution? : Pokemon,
    originGen : number
}

export interface PokemonAbility {
    ability : NamedAPIResource,
    is_hidden : boolean,
    slot : number
}

export interface PokemonHeldItem {
    item : NamedAPIResource,
    versionDetails : PokemonHeldItemVersion[]
}

export interface PokemonHeldItemVersion {
    version : NamedAPIResource,
    rarity : number
}

export interface PokemonMove {
    move : NamedAPIResource,
    version_group_details : PokemonMoveVersion[]
}

export interface PokemonMoveVersion {
    move_learn_method : NamedAPIResource,
    version_group : NamedAPIResource,
    level_learned_at : number
}

export interface PokemonTypePast {
    generation : NamedAPIResource,
    types : PokemonType[]
}

export interface Sprites {
    front_default : string,
    front_shiny : string,
    front_female : string,
    front_shiny_female : string,
    back_default : string,
    back_shiny : string,
    back_female : string,
    back_shiny_female : string
}

export interface PokemonStat {
    stat : NamedAPIResource,
    effort : number,
    baseStat : number
}

export interface PokemonType {
    slot : number,
    type : NamedAPIResource
}