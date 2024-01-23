import { AbilityEffectChange } from "./Ability"
import { PokemonMoveVersion } from "./Pokemon"
import { APIResource, MachineVersionDetail, NamedAPIResource, VerboseEffect } from "./Utility"

export interface Move {
    id : number,
    name : string,
    accuracy : number,
    effectChance : number,
    pp : number,
    priority : number,
    power : number,
    contestCombos : ContestComboSets,
    contestType : NamedAPIResource,
    contestEffect : APIResource,
    damageClass : NamedAPIResource,
    effectEntries : VerboseEffect,
    effectChanges : AbilityEffectChange[],
    learnedByPokemon : NamedAPIResource[],
    flavorTextEntries : MoveFlavorText[],
    generation : NamedAPIResource,
    machines : MachineVersionDetail[],
    meta : MoveMetaData,
    pastValues : PastMoveStatValues[],
    statChanges : MoveStatChange[],
    superContestEffect : NamedAPIResource,
    target : NamedAPIResource,
    type : NamedAPIResource
}

export interface ContestComboSets {
    normal : ContestComboDetail,
    super : ContestComboDetail
}

export interface ContestComboDetail {
    useBefore : NamedAPIResource[],
    useAfter : NamedAPIResource[]
}

export interface MoveFlavorText {
    flavorText : string,
    language : NamedAPIResource,
    versionGroup : NamedAPIResource
}

export interface MoveMetaData {
    ailment : NamedAPIResource,
    category : NamedAPIResource,
    minHits : number,
    maxHits : number,
    minTurns : number,
    maxTurns : number,
    drain : number,
    healing : number,
    critRate : number,
    ailmentChance : number,
    flinchChance : number,
    statChance : number
}

export interface MoveStatChange {
    change : number,
    stat : NamedAPIResource
}

export interface PastMoveStatValues {
    accuracy : number,
    effectChance : number,
    power : number,
    pp : number,
    effectEntries : VerboseEffect[],
    type : NamedAPIResource,
    versionGroup : NamedAPIResource
}

export interface LearnsetMove {
    move : NamedAPIResource,
    version : PokemonMoveVersion
}