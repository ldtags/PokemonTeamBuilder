export interface APIResource {
    url : string
}

export interface NamedAPIResource extends APIResource {
    name : string
}

export interface SimplePokemon extends NamedAPIResource {
    id : number
}

export interface Effect {
    effect : string,
    language : NamedAPIResource
}

export interface VerboseEffect extends Effect {
    shortEffect : string
}

export interface MachineVersionDetail {
    machine : NamedAPIResource,
    versionGroup : NamedAPIResource
}

export interface GenerationGameIndex {
    gameIndex : number,
    generation : NamedAPIResource
}

export interface VersionGameIndex {
    gameIndex : number,
    version : NamedAPIResource
}

export interface Name {
    name : string,
    language : NamedAPIResource
}