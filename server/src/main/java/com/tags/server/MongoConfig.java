package com.tags.server;

import java.net.UnknownHostException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig {
	public @Bean MongoClient mongo() throws UnknownHostException {
		return MongoClients.create( "mongodb://localhost:27017" );
	}

	public @Bean MongoTemplate mongoTemplate() throws Exception {
		return new MongoTemplate( mongo(), "secure_team_builder_database" );
	}
}