package io.maxilog.sociallogin.config;

import io.maxilog.sociallogin.security.handler.OAuth2AuthenticationFailureHandler;
import io.maxilog.sociallogin.security.handler.OAuth2AuthenticationSuccessHandler;
import io.maxilog.sociallogin.security.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import io.maxilog.sociallogin.security.service.OAuth2UserServiceImpl;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    private final OAuth2UserServiceImpl OAuth2UserServiceImpl;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    public ResourceServerConfig(OAuth2UserServiceImpl OAuth2UserServiceImpl,
                                OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler, OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler,
                                HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository) {
        this.OAuth2UserServiceImpl = OAuth2UserServiceImpl;
        this.oAuth2AuthenticationSuccessHandler = oAuth2AuthenticationSuccessHandler;
        this.oAuth2AuthenticationFailureHandler = oAuth2AuthenticationFailureHandler;
        this.httpCookieOAuth2AuthorizationRequestRepository = httpCookieOAuth2AuthorizationRequestRepository;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {

        http
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth/social")
                .authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository)
                .and()
                .redirectionEndpoint()
                .baseUri("/oauth/callback/*")
                .and()
                .userInfoEndpoint()
                .userService(OAuth2UserServiceImpl)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler)
                .and()
                .requestMatcher(request -> {
                    String auth = request.getHeader(HttpHeaders.AUTHORIZATION);
                    String uri = request.getRequestURI();
                    return (auth != null && auth.startsWith("Bearer")) || uri.startsWith("/oauth/social") || uri.startsWith("/oauth/callback")
                            || uri.startsWith("/api/signup") || uri.startsWith("/.well-known/openid-configuration");
                })
                .authorizeRequests().anyRequest().permitAll();
    }

}