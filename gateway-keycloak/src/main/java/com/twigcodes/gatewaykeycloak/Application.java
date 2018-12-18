package com.twigcodes.gatewaykeycloak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;

/**
 * Application
 */
@SpringBootApplication
@EnableZuulProxy
@EnableDiscoveryClient
@RefreshScope
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

   @Bean
   public KeycloakAuthorizationFilter keycloakAuthorizationFilter() {
     return new KeycloakAuthorizationFilter();
   }
}