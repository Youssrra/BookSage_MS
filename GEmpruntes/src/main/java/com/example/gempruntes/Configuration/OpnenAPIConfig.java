package com.example.gempruntes.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springdoc.core.GroupedOpenApi;


@Configuration
public class OpnenAPIConfig {
    @Bean
    public GroupedOpenApi productPublicApi() {
        return GroupedOpenApi.builder()
                .group("Only Product Management API")
                .pathsToMatch("/contrat/**")
                .pathsToExclude("**")
                .build();
    }

    @Bean
    public GroupedOpenApi All() {
        return GroupedOpenApi.builder()
                .group("ALL API")
                .pathsToMatch("/**")
                .build();
    }
}