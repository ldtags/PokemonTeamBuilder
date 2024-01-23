package com.tags.server.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Move {
    private int accuracy;

    @JsonProperty( "contest_combos" )
    private Object contestCombos;

    @JsonProperty( "contest_effect" )
    private Object contestEffect;

    @JsonProperty( "contest_type" )
    private NamedAPIResource contestType;

    @JsonProperty( "damage_class" )
    private NamedAPIResource damageClass;

    @JsonProperty( "effect_chance" )
    private Object effectChance;

    @JsonProperty( "effect_changes" )
    private List<Object> effectChanges;

    @JsonProperty( "effect_entries" )
    private List<Object> effectEntries;

    @JsonProperty( "flavor_text_entries" )
    private List<Object> flavorTextEntries;

    private NamedAPIResource generation;
    private int id;

    @JsonProperty( "learned_by_pokemon" )
    private List<NamedAPIResource> learnedByPokemon;

    private List<Object> machines;
    private Object meta;
    private String name;
    private List<Object> names;

    @JsonProperty( "past_values" )
    private List<Object> pastValues;

    private int power;
    private int pp;
    private int priority;
    
    @JsonProperty( "stat_changes" )
    private List<Object> statChanges;

    @JsonProperty( "super_contest_effect" )
    private Object superContestEffect;

    private NamedAPIResource target;
    private NamedAPIResource type;

    public int getAccuracy() {
        return this.accuracy;
    }

    public Object getContestCombos() {
        return this.contestCombos;
    }

    public Object getContestEffect() {
        return this.contestEffect;
    }

    public NamedAPIResource getContestType() {
        return this.contestType;
    }

    public NamedAPIResource getDamageClass() {
        return this.damageClass;
    }

    public Object getEffectChance() {
        return this.effectChance;
    }

    public List<Object> getEffectChanges() {
        return this.effectChanges;
    }

    public List<Object> getEffectEntries() {
        return this.effectEntries;
    }

    public List<Object> getFlavorTextEntries() {
        return this.flavorTextEntries;
    }

    public NamedAPIResource getGeneration() {
        return this.generation;
    }

    public int getId() {
        return this.id;
    }

    public List<Object> getMachines() {
        return this.machines;
    }

    public Object getMeta() {
        return this.meta;
    }

    public String getName() {
        return this.name;
    }

    public List<Object> getNames() {
        return this.names;
    }

    public List<Object> getPastValues() {
        return this.pastValues;
    }

    public int getPower() {
        return this.power;
    }

    public int getPP() {
        return this.pp;
    }

    public int getPriority() {
        return this.priority;
    }

    public List<Object> getStatChanges() {
        return this.statChanges;
    }

    public Object getSuperContestEffect() {
        return this.superContestEffect;
    }

    public NamedAPIResource getTarget() {
        return this.target;
    }

    public NamedAPIResource getType() {
        return this.type;
    }
}
