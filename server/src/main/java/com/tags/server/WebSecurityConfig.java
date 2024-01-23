package com.tags.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import com.tags.server.security.AuthenticationFailure;
import com.tags.server.security.AuthenticationSuccess;
import com.tags.server.security.EntryPointUnauthorizedHandler;
import com.tags.server.services.UserService;

@Configuration
@EnableMongoRepositories
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private AuthenticationFailure authFailure;

    @Autowired
	private AuthenticationSuccess authSuccess;

	@Autowired
	private EntryPointUnauthorizedHandler authDenied;

    @Bean
    public UserService customUserDetailsService() {
        return new UserService();
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder( 11 );
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService( customUserDetailsService() );
        authProvider.setPasswordEncoder( encoder() );
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager( AuthenticationConfiguration authConfig ) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain( HttpSecurity http ) throws Exception {
        http
            .authorizeHttpRequests( auth ->
                auth
                    .antMatchers( "/", "/css/**", "/assets/**", "/resources/**", "/js/**", Constants.API_VERSION + "/pokemon/simple" ).permitAll()
                    .antMatchers( "/public/**", Constants.API_VERSION + "/user" ).permitAll()
                    .antMatchers( Constants.API_VERSION + "/login", Constants.API_VERSION + "/logout" ).permitAll()
                    .antMatchers( Constants.API_VERSION + "/**" ).authenticated()
                    .anyRequest().permitAll()
            )
            .exceptionHandling( exception ->
                exception.authenticationEntryPoint( authDenied )
            )
            .formLogin( form ->
                form
                    .successHandler( authSuccess )
                    .failureHandler( authFailure )
                    .loginPage( "/" )
                    .loginProcessingUrl( Constants.API_VERSION + "/login" )
                    .defaultSuccessUrl( Constants.API_VERSION + "/user" )
                    .usernameParameter( "username" )
                    .passwordParameter( "password" )
                    .permitAll()
			)
            .logout( logout ->
                logout
                      .logoutUrl( Constants.API_VERSION + "/logout" )
                      .permitAll()
            )
            .csrf( csrf ->
                csrf.csrfTokenRepository( CookieCsrfTokenRepository.withHttpOnlyFalse() )
            );

        return http.build();
    }
}
