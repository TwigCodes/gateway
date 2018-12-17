package com.twigcodes.gatewaykeycloak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * Application
 */
@SpringBootApplication
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

  // @Bean
  // public KeycloakAuthorizationFilter keycloakAuthorizationFilter() {
  //   return new KeycloakAuthorizationFilter();
  // }
}