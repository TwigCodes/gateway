package com.twigcodes.gatewaykeycloak;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import java.security.Principal;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.adapters.RefreshableKeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;

@Slf4j
public class KeycloakAuthorizationFilter extends ZuulFilter {
  private static final String AUTHORIZATION_HEADER = "Authorization";

    @Override
    public String filterType() {
        return FilterConstants.ROUTE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    @Override
    public boolean shouldFilter() {
         RequestContext ctx = RequestContext.getCurrentContext();
         HttpServletRequest request = ctx.getRequest();
         Principal principal = request.getUserPrincipal();
         return principal instanceof KeycloakAuthenticationToken;
    }

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        if (ctx.getRequest().getHeader(AUTHORIZATION_HEADER) == null) {
            addKeycloakTokenToHeader(ctx);
        }
        return null;
    }

    private void addKeycloakTokenToHeader(RequestContext ctx) {
        RefreshableKeycloakSecurityContext securityContext = getRefreshableKeycloakSecurityContext(ctx);
        if (securityContext != null) {
            ctx.addZuulRequestHeader(AUTHORIZATION_HEADER, buildBearerToken(securityContext));
        }
    }

    private RefreshableKeycloakSecurityContext getRefreshableKeycloakSecurityContext(RequestContext ctx) {
        if (ctx.getRequest().getUserPrincipal() instanceof KeycloakAuthenticationToken) {
            KeycloakAuthenticationToken token = (KeycloakAuthenticationToken) ctx.getRequest().getUserPrincipal();
            return (RefreshableKeycloakSecurityContext) token.getCredentials();
        }
        return null;
    }

    private String buildBearerToken(RefreshableKeycloakSecurityContext securityContext) {
        return "Bearer " + securityContext.getTokenString();
    }

}