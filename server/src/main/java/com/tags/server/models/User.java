package com.tags.server.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Document
public class User implements UserDetails {
    @Id
    private String id;

    @Indexed( unique = true )
    private String username;

    private String password;
    private List<String> roles;
	private boolean isAccountNonExpired;
	private boolean isAccountNonLocked;
	private boolean isCredentialsNonExpired;
	private boolean isEnabled;
    private List<TeamPokemon> team;

    public User() {}

    public User( Builder builder ) {
        this.roles = builder.roles;
        this.username = builder.username;
        this.password = builder.password;
		this.isAccountNonExpired = builder.isAccountNonExpired;
		this.isAccountNonLocked = builder.isAccountNonLocked;
		this.isCredentialsNonExpired = builder.isCredentialsNonExpired;
		this.isEnabled = builder.isEnabled;
        this.team = builder.team;
    }

    @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<>();
		for( String s : roles ) {
			authorities.add( new SimpleGrantedAuthority( s ) );
		}
		
		return authorities;
	}

    public void setRoles( List<String> roles ) {
        this.roles = roles;
    }

    public List<String> getRoles() {
        return this.roles;
    }

    public void setUsername( String username ) {
        this.username = username;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    public void setPassword( String password ) {
        this.password = password;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
	public boolean isAccountNonExpired() {
		return this.isAccountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.isAccountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.isCredentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return this.isEnabled;
	}

    public List<TeamPokemon> getTeam() {
        return this.team;
    }

    public void setTeam( List<TeamPokemon> team ) {
        this.team = team;
    }

    public String getId() {
        return this.id;
    }

    public static class Builder {
        private List<String> roles;
        private String username;
        private String password;
		private boolean isAccountNonExpired;
		private boolean isAccountNonLocked;
		private boolean isCredentialsNonExpired;
		private boolean isEnabled;
        private List<TeamPokemon> team;

        public Builder roles( List<String> roles ) { this.roles = roles; return this; }
        public Builder username( String username ) { this.username = username; return this; }
        public Builder password( String password ) { this.password = password; return this; }
		public Builder isAccountNonExpired( boolean f ) { this.isAccountNonExpired = f; return this; }
		public Builder isAccountNonLocked( boolean f ) { this.isAccountNonLocked = f; return this; }
		public Builder isCredentialsNonExpired( boolean f) { this.isCredentialsNonExpired = f; return this; }
		public Builder isEnabled( boolean f ) { this.isEnabled = f; return this; }
        public Builder team( List<TeamPokemon> team ) { this.team = team; return this; }

        public User build() { return new User( this ); }
    }
}
