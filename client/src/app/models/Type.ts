import { GenerationGameIndex, Name, NamedAPIResource } from "./Utility";

export interface Type {
    id : number,
    name : string,
    damageRelations : TypeRelations,
    pastDamageRelations : TypeRelationsPast[],
    gameIndices : GenerationGameIndex[],
    generation : NamedAPIResource,
    moveDamageClass : NamedAPIResource,
    names : Name[],
    pokemon : TypePokemon[],
    moves : NamedAPIResource[]
}

export interface TypeRelations {
    noDamageTo : NamedAPIResource[],
    halfDamageTo : NamedAPIResource[],
    doubleDamageTo : NamedAPIResource[],
    noDamageFrom : NamedAPIResource[],
    halfDamageFrom : NamedAPIResource[],
    doubleDamageFrom : NamedAPIResource[]
}

export interface TypeRelationsPast {
    generation : NamedAPIResource,
    damageRelations : TypeRelations
}

export interface TypePokemon {
    slot : number,
    pokemon : NamedAPIResource
}