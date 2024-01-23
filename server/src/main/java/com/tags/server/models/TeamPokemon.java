package com.tags.server.models;

import java.util.List;

public class TeamPokemon {
    private Pokemon pokemon;
    private List<Move> moves;
    private Ability ability;

    public Pokemon getPokemon() {
        return this.pokemon;
    }

    public List<Move> getMoves() {
        return this.moves;
    }

    public Ability getAbility() {
        return this.ability;
    }
}
