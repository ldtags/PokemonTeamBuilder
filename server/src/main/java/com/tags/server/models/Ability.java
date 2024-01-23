package com.tags.server.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Ability {
    @JsonProperty( "effect_changes" )
    private List<Object> effectChanges;

    @JsonProperty( "effect_entries" )
    private List<Object> effectEntries;

    @JsonProperty( "flavor_text_entries" )
    private List<Object> flavorTextEntries;

    @JsonProperty( "is_main_series" )
    private boolean isMainSeries;

    private NamedAPIResource generation;
    private int id;
    private String name;
    private List<Object> names;
    private List<Object> pokemon;

    public List<Object> getEffectChanges() {
        return this.effectChanges;
    }

    public List<Object> getEffectEntries() {
        return this.effectEntries;
    }

    public List<Object> getFlavorTextEntries() {
        return this.flavorTextEntries;
    }

    public boolean getIsMainSeries() {
        return this.isMainSeries;
    }

    public NamedAPIResource getGeneration() {
        return this.generation;
    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public List<Object> getNames() {
        return this.names;
    }

    public List<Object> getPokemon() {
        return this.pokemon;
    }
}
