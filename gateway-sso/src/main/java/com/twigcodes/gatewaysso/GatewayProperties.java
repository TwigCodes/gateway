package com.twigcodes.gatewaysso;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * GatewayProperties
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "gateway")
public class GatewayProperties {
  private Auth auth = new Auth();
  @Data
  public static class Auth {
    private String logoutUrl;
    private String logoutRedirectUrl;
  }
}