package com.tags.server.models;

import java.util.ArrayList;
import java.util.List;

public class PokemonResponse {
    private int count;
    private String next;
    private String previous;
    private List<NamedAPIResource> results;

    public PokemonResponse() {
        results = new ArrayList<>();
    }

    public PokemonResponse( int count, String next, String previous, List<NamedAPIResource> results ) {
        this.count = count;
        this.next = next;
        this.previous = previous;
        this.results = results;
    }

    public int getCount() {
        return this.count;
    }

    public String getNext() {
        return this.next;
    }

    public String getPrevious() {
        return this.previous;
    }

    public List<NamedAPIResource> getResults() {
        return this.results;
    }
}
