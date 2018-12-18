package com.twigcodes.demob;

import javax.servlet.http.HttpServletRequest;
import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.context.request.RequestContextListener;

/**
 * ResourceServerConfg
 */
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter{

  @Bean
  public RequestContextListener requestContextListener() {
    return new RequestContextListener();
  }

  @Override
  public void configure(ResourceServerSecurityConfigurer resources) {
    resources.resourceId("login-app");
  }

  @Override
  public void configure(HttpSecurity http) throws Exception {
    http.exceptionHandling()
      .and()
        .authorizeRequests()
        .requestMatchers(EndpointRequest.toAnyEndpoint()).permitAll()
      .and()
        .requestMatcher(new OAuthRequestedMatcher())
        .authorizeRequests()
        .anyRequest().fullyAuthenticated();
  }

  private static class OAuthRequestedMatcher implements RequestMatcher {

    public boolean matches(HttpServletRequest request) {
      String auth = request.getHeader("Authorization");
      boolean haveOauth2Token =
          (auth != null) && auth.startsWith("Bearer");
      boolean haveAccessToken = request.getParameter("access_token") != null;
      return haveOauth2Token || haveAccessToken;
    }
  }
}