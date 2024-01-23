package com.tags.server.models;

public class PokemonType {
    private NamedAPIResource pokemon;
    private int slot;

    public NamedAPIResource getPokemon() {
        return this.pokemon;
    }

    public int getSlot() {
        return this.slot;
    }
}
