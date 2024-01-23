import { Effect, Name, NamedAPIResource, VerboseEffect } from "./Utility";

export interface Ability {
    id : number,
    name : string,
    isMainSeries : boolean,
    generation : NamedAPIResource,
    names : Name[],
    effectEntries : VerboseEffect[],
    effectChanges : AbilityEffectChange[],
    flavorTextEntries : AbilityFlavorText[],
    pokemon : AbilityPokemon[]
}

export interface AbilityEffectChange {
    effectEntries : Effect[],
    versionGroup : NamedAPIResource
}

export interface AbilityFlavorText {
    flavorText : string,
    language : NamedAPIResource,
    versionGroup : NamedAPIResource
}

export interface AbilityPokemon {
    isHidden : boolean,
    slot : number,
    pokemon : NamedAPIResource
}