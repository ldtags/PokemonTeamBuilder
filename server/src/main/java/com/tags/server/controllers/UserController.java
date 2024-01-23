package com.tags.server.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tags.server.services.UserService;
import com.tags.server.Constants;
import com.tags.server.models.TeamPokemon;
import com.tags.server.models.User;
import com.tags.server.security.BadRequestException;

@CrossOrigin( origins = {"*"}, maxAge = 600 )
@RestController
@RequestMapping( Constants.API_VERSION )
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder encoder;
	
	@GetMapping( value="/user" )
	@Nullable
	public UserDetails getUser( Principal p ) {
		if( p == null || p.getName() == null ) return null;
		return userService.loadUserByUsername( p.getName() );
	}

	@GetMapping( value="/user/all" )
	public List<User> getAllUsers() {
		return userService.loadAllUsers();
	}

	@PutMapping( value="/user/update" )
	@Nullable
	public User updateUser( @RequestBody Map<String, String> body ) throws BadRequestException {
		String username = body.get( "username" );
		if ( username == null ) {
			throw new BadRequestException( "user not found" );
		}

		User loadedUser = userService.loadUserByUsername( username );
		String password = body.get( "password" );
		if ( password == null ) {
			throw new BadRequestException( "password not included in request" );
		} else if ( !password.equals( "" ) ) {
			loadedUser.setPassword( encoder.encode( password ) );
		}

		return userService.save( loadedUser );
	}

	@PostMapping( value="team" )
    public List<TeamPokemon> addToTeam( @RequestBody Map<String, TeamPokemon> body, Principal principal )
            throws BadRequestException {
        User user = userService.loadUserByUsername( principal.getName() );
        List<TeamPokemon> team = user.getTeam();
        if ( team == null ) {
            team = new ArrayList<>();
        } else if ( team.size() > 5 ) {
            throw new BadRequestException( "team is full" );
        }

        team.add( body.get( "pokemon" ) );
        user.setTeam( team );
        userService.save( user );
        return team;
    }

    @DeleteMapping( value="team/clear" )
    public void clearPokemon( Principal principal ) {
        User user = userService.loadUserByUsername( principal.getName() );
        user.setTeam( null );
        userService.save( user );
    }
}
