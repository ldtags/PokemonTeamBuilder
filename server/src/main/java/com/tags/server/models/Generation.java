package com.tags.server.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Generation {
    private List<NamedAPIResource> abilities;
    private int id;
    @JsonProperty("main_region")
    private NamedAPIResource main_region;
    private List<NamedAPIResource> moves;
    private String name;
    private List<Object> names;
    @JsonProperty("pokemon_species")
    private List<NamedAPIResource> pokemon_species;
    private List<NamedAPIResource> types;
    @JsonProperty("version_groups")
    private List<NamedAPIResource> version_groups;

    public List<NamedAPIResource> getAbilities() {
        return this.abilities;
    }

    public int getId() {
        return this.id;
    }

    public NamedAPIResource getMainRegion() {
        return this.main_region;
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

    public List<NamedAPIResource> getPokemonSpecies() {
        return this.pokemon_species;
    }

    public List<NamedAPIResource> getTypes() {
        return this.types;
    }

    public List<NamedAPIResource> getVersionGroups() {
        return this.version_groups;
    }
}
