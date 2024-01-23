package com.tags.server.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Pokemon {
    private int id;
    private String name;
    @JsonProperty( "base_experience" )
    private int baseExperience;
    private int height;
    private int order;
    private int weight;
    private List<Object> abilities;
    private List<Object> forms;
    private List<Object> moves;
    private Object sprites;
    private Object species;
    private List<Object> stats;
    private List<Object> types;

    public Pokemon() {}

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public int getBaseExperience() {
        return this.baseExperience;
    }

    public int getHeight() {
        return this.height;
    }

    public int getOrder() {
        return this.order;
    }

    public int getWeight() {
        return this.weight;
    }

    public List<Object> getAbilities() {
        return this.abilities;
    }

    public List<Object> getForms() {
        return this.forms;
    }

    public List<Object> getTypes() {
        return this.types;
    }

    public List<Object> getStats() {
        return this.stats;
    }

    public Object getSprites() {
        return this.sprites;
    }

    public Object getSpecies() {
        return this.species;
    }

    public List<Object> getMoves() {
        return this.moves;
    }
 }
