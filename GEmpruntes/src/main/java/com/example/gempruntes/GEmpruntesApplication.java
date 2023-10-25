package com.example.gempruntes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class GEmpruntesApplication {

    public static void main(String[] args) {
        SpringApplication.run(GEmpruntesApplication.class, args);
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods("GET", "DELETE", "POST", "PUT", "OPTIONS").allowedHeaders("*")
                        .allowedOrigins("*");

            }
        };
    }
}
