package com.tags.server.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tags.server.models.User;
import com.tags.server.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public User loadUserByUsername( String username ) throws UsernameNotFoundException {
        User user = userRepository.findByUsername( username );
        if ( user == null ) {
            throw new UsernameNotFoundException( "user doesn't exist" );
        }
        return user;
    }

    public User loadUserById( String id ) throws UsernameNotFoundException {
        Optional<User> optional = userRepository.findById( id );
        User user = optional.get();
        if ( user == null ) {
            throw new UsernameNotFoundException( "user doesn't exist" );
        }
        return user;
    }

    public List<User> loadAllUsers() {
        return userRepository.findAll();
    }

    public User save( User user ) {
        return userRepository.save( user );
    }

	@PostConstruct
	public void makeMockUsers() {
		if ( this.userRepository.count() > 0 ) return;
		this.userRepository.deleteAll();

		addMockUser( "jDoe6349", "password", "USER" );
        addMockUser( "spikeLee060", "spikey", "USER" );
        addMockUser( "blackMamba24", "goat", "USER" );
        addMockUser( "hairyPotter83", "pottingpro", "USER" );
        addMockUser( "admin1", "123", "USER", "ADMIN" );
	}

    private void addMockUser( String username, String password, String... roles ) {
        String hash = encoder.encode( password );
        List<String> userRoles = new ArrayList<String>();
        for ( String role : roles ) {
            userRoles.add( role );
        }

        userRepository.save( new User.Builder()
            .roles( userRoles )
            .password( hash )
            .username( username )
            .isEnabled( true )
            .isAccountNonExpired( true )
            .isAccountNonLocked( true )
            .isCredentialsNonExpired( true )
            .build()
        );
    }
}
