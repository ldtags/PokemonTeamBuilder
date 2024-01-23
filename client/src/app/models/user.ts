import { TeamPokemon } from "./Team";

export interface User {
    id : string,
    username : string,
    password : string,
    roles : string[],
    team : TeamPokemon[]
}