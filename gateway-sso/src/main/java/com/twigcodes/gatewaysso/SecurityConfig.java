package com.twigcodes.gatewaysso;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import lombok.RequiredArgsConstructor;

@EnableOAuth2Sso
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .logout().logoutUrl("/oauth2/logout")
            .and()
                .authorizeRequests()
                .antMatchers("/error", "/actuator/**").permitAll()
                .anyRequest().authenticated()
            .and()
                .oauth2Login()
            .and()
                .csrf()
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    }

}