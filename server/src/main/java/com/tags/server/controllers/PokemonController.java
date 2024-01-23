package com.tags.server.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.tags.server.models.Pokemon;
import com.tags.server.models.PokemonResponse;
import com.tags.server.models.PokemonType;
import com.tags.server.models.Type;
import com.tags.server.security.BadRequestException;
import com.tags.server.models.Ability;
import com.tags.server.models.Generation;
import com.tags.server.models.Move;
import com.tags.server.models.NamedAPIResource;
import com.tags.server.Constants;

@CrossOrigin( origins = {"*"}, maxAge = 600 )
@RestController
@RequestMapping( Constants.API_VERSION )
public class PokemonController {

    private final RestTemplate restTemplate = new RestTemplate();


    /*
     * Params:
     *  @url -> the base url of the request
     *  @limit -> the limit of pokemon that can be recieved
     *  @offset -> the offset of pokemon to ignore
     * 
     * adds range parameters to @url that specify the bounds of pokemon requested
     */
    private String addRangeParams( String url, String limit, String offset ) {
        if ( offset != null || limit != null ) url += "?";
        if ( offset != null ) url += "offset=" + offset;
        if ( offset != null && limit != null ) url += "&";
        if ( limit != null ) url += "limit=" + limit;

        return url;
    }

    /*
     * Request Params:
     *  @offset -> an integer denoting the amount of pokemon that will be skipped
     *  @limit -> an integer denoting the total amount of pokemon that will be recieved
     * 
     * responds with a list of NamedAPIResources that each represent an indivdual pokemon
     *   within the bounds specified by @offset and @limit
     *   responds with a list containing NamedAPIResources that represent all pokemon
     *     if @limit and @offset are not defined
     *
     * throws a BadRequestException if the response is either not recieved or not correct
     */
    @GetMapping( value="/pokemon/simple" )
    public List<NamedAPIResource> getSimplePokemon( @RequestParam( required=false ) Integer offset,
            @RequestParam( required=false ) Integer limit, Principal p ) throws BadRequestException {

        String url = Constants.POKEAPI_URL + "/pokemon";
        url = addRangeParams( url, limit.toString(), offset.toString() );
        PokemonResponse response = restTemplate.getForObject( url, PokemonResponse.class );
        if ( response == null ) {
            throw new BadRequestException( "response not recieved from " + url );
        }

        List<NamedAPIResource> simpleList = response.getResults();
        if ( simpleList == null ) {
            throw new BadRequestException( "results from " + url + " are not defined" );
        }
        return simpleList;
    }


    /*
     * Request Params:
     *  @offset -> an integer denoting the amount of pokemon that will be skipped
     *  @limit -> an integer denoting the total amount of pokemon that will be recieved
     * 
     * responds with a list of detailed pokemon within the bounds of offset and limit
     *  responds with a list of all detailed pokemon if both @offset and @limit are undefined
     *
     * throws a BadRequestException if the response is either not recieved or not correct
     */
    @GetMapping( value="/pokemon" )
    public List<Pokemon> getPokemonList( @RequestParam( required=false ) Integer offset,
            @RequestParam( required=false ) Integer limit ) throws BadRequestException {

        String url = Constants.POKEAPI_URL + "/pokemon";
        url = addRangeParams( url, limit.toString(), offset.toString() );
        PokemonResponse response = restTemplate.getForObject( url, PokemonResponse.class );
        if ( response == null ) {
            throw new BadRequestException( "response not recieved from " + url );
        }

        List<NamedAPIResource> simpleList = response.getResults();
        if ( simpleList == null ) {
            throw new BadRequestException( "results from " + url + " are not defined" );
        }
        List<Pokemon> pokemonList = new ArrayList<Pokemon>();
        for ( NamedAPIResource simplePkmn : simpleList ) {
            pokemonList.add( getDetailedPokemon( simplePkmn.getName() ) );
        }
        return pokemonList;
    }


    /*
     * Params:
     *  @list -> a list of NamedAPIResources
     *  @target -> the NamedAPIResource the method is checking for
     */
    private boolean resourceExists( List<NamedAPIResource> list, NamedAPIResource target ) {
        for ( NamedAPIResource resource : list ) {
            if ( resource.getName().equals( target.getName() ) ) {
                return true;
            }
        }
        return false;
    }

    /*
     * Params:
     *  @baseList -> a list of NamedAPIResources
     *  @targetList -> a list of NamedAPIResources to compare the @baseList against
     * 
     * returns a list containing all NamedAPIResources that appear in both @baseList and @targetList
     */
    private List<NamedAPIResource> intersectLists( List<NamedAPIResource> baseList, List<NamedAPIResource> targetList ) {
        List<NamedAPIResource> intersectList = new ArrayList<NamedAPIResource>();
        if ( baseList.isEmpty() ) {
            intersectList.addAll( targetList );
        } else {
            for ( NamedAPIResource resource : baseList ) {
                if ( resourceExists( targetList, resource ) ) {
                    intersectList.add( resource );
                }
            }
        }
        return intersectList;
    }

    /*
     * Params:
     *  @gen -> a string containing an integer within the range [1 - 9] that represents a generation
     * 
     * returns a list of pokemon that were introduced in the generation represented by @gen
     *  throws a BadRequestException if the response from the PokeAPI endpoint is null
     */
    private List<NamedAPIResource> getPokemonFromGen( String gen ) throws BadRequestException {
        String url = Constants.POKEAPI_URL + "/generation/" + gen;
        Generation generation = restTemplate.getForObject( url, Generation.class );
        if ( generation == null ) {
            throw new BadRequestException( "response not recieved from " + url );
        }

        return generation.getPokemonSpecies();
    }

    /*
     * Params:
     *  @type -> a valid pokemon type
     *
     * returns a list of pokemon that have @type in either type slot
     */
    private List<NamedAPIResource> getPokemonFromType( String type ) throws BadRequestException {
        String url = Constants.POKEAPI_URL + "/type/" + type.toLowerCase();
        Type detailedType = restTemplate.getForObject( url, Type.class );
        if ( detailedType == null ) {
            throw new BadRequestException( "response not recieved from " + url );
        }

        List<NamedAPIResource> typedPokemon = new ArrayList<>();
        for ( PokemonType pkmn : detailedType.getPokemon() ) {
            typedPokemon.add( pkmn.getPokemon() );
        }
        return typedPokemon;
    }

    /*
     * Request Parameters:
     *  params -
     *      @gen : an integer denoting the valid generation of pokemon requested
     *      @primary : a string denoting the valid primary type of pokemon requested
     *      @secondary : a string denoting the valid secondary type of a pokemon requested
     * 
     * responds with a list containing NamedAPIResources that represent pokemon that
     *  that satisfy each present filter parameter
     *  responds with an empty list if no satisfactory pokemon are found
     * 
     * good for small scale, but a new strategy is needed if more filters are added
     */
    @GetMapping( value="/pokemon/filtered" )
    public List<NamedAPIResource> getFilteredList( @RequestParam( required=false ) String gen,
            @RequestParam( required=false ) String type ) throws BadRequestException {
        List<NamedAPIResource> filteredList = new ArrayList<NamedAPIResource>();

        if ( gen != null ) {
            filteredList = intersectLists( filteredList, getPokemonFromGen( gen ) );
        }

        if ( type != null ) {
            filteredList = intersectLists( filteredList, getPokemonFromType( type ) );
        }

        return filteredList;
    }


    @GetMapping( value="/pokemon/{pid}" )
    public Pokemon getDetailedPokemon( @PathVariable String pid ) {
        String url = Constants.POKEAPI_URL + "/pokemon/" + pid;
        return restTemplate.getForObject( url, Pokemon.class );
    }


    @GetMapping( value="/pokemon/{pid}/sprites" )
    public Object getPokemonSprites( @PathVariable String pid ) {
        String url = Constants.POKEAPI_URL + "/pokemon/" + pid;
        Pokemon pokemon = restTemplate.getForObject( url, Pokemon.class );
        return pokemon != null
            ? pokemon.getSprites()
            : null;
    }


    @GetMapping( value="/types" )
    public Object getTypes() {
        String url = Constants.POKEAPI_URL + "/type";
        PokemonResponse response = restTemplate.getForObject( url, PokemonResponse.class );
        return response != null
            ? response.getResults()
            : null;
    }

    @GetMapping( value="abilities" )
    public Ability getAbility( @RequestParam( required=true ) String abilityName ) {
        String url = Constants.POKEAPI_URL + "/ability/" + abilityName.toLowerCase();
        return restTemplate.getForObject( url, Ability.class );
    }

    @GetMapping( value="abilities/simple" )
    public List<NamedAPIResource> getSimpleAbilities() {
        String url = Constants.POKEAPI_URL + "/ability";
        PokemonResponse response = restTemplate.getForObject( url, PokemonResponse.class );
        return response != null
            ? response.getResults()
            : null;
    }

    @GetMapping( value="moves" )
    public Move getMove( @RequestParam( required=true ) String moveName ) {
        String url = Constants.POKEAPI_URL + "/move/" + moveName.toLowerCase();
        return restTemplate.getForObject( url, Move.class );
    }

    @GetMapping( value="moves/simple" )
    public List<NamedAPIResource> getSimpleMoves() {
        String url = Constants.POKEAPI_URL + "/move";
        PokemonResponse response = restTemplate.getForObject( url, PokemonResponse.class );
        return response != null
            ? response.getResults()
            : null;
    }

    @GetMapping( value="versions" )
    public List<NamedAPIResource> getVersionGroups() {
        String url = Constants.POKEAPI_URL + "/version-group";
        PokemonResponse response = restTemplate.getForObject( url, PokemonResponse.class );
        return response != null
            ? response.getResults()
            : null;
    }
}
