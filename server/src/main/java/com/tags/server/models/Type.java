package com.tags.server.models;

import java.util.List;

public class Type {
    private List<Object> damage_relations;
    private List<Object> game_indices;
    private NamedAPIResource generation;
    private int id;
    private NamedAPIResource move_damage_class;
    private List<NamedAPIResource> moves;
    private String name;
    private List<Object> names;
    private List<Object> past_damage_relations;
    private List<PokemonType> pokemon;

    public List<Object> getDamageRelations() {
        return this.damage_relations;
    }

    public List<Object> getGameIndices() {
        return this.game_indices;
    }

    public NamedAPIResource getGeneration() {
        return this.generation;
    }

    public int getId() {
        return this.id;
    }

    public NamedAPIResource moveDamageClass() {
        return this.move_damage_class;
    }

    public List<NamedAPIResource> getMoves() {
        return this.moves;
    }

    public String getName() {
        return this.name;
    }

    public List<Object> getNames() {
        return this.names;
    }

    public List<Object> getPastDamageRelations() {
        return this.past_damage_relations;
    }

    public List<PokemonType> getPokemon() {
        return this.pokemon;
    }
}
