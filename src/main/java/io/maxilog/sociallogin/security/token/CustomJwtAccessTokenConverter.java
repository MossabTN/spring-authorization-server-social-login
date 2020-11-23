package io.maxilog.sociallogin.security.token;

import org.springframework.security.jwt.JwtHelper;
import org.springframework.security.jwt.crypto.sign.RsaSigner;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2RefreshToken;
import org.springframework.security.oauth2.common.util.JsonParser;
import org.springframework.security.oauth2.common.util.JsonParserFactory;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

public class CustomJwtAccessTokenConverter extends JwtAccessTokenConverter {

    final RsaSigner signer;
    private final JsonParser objectMapper = JsonParserFactory.create();
    private Map<String, String> customHeaders = new HashMap<>();

    public CustomJwtAccessTokenConverter(Map<String, String> customHeaders, KeyPair keyPair) {
        super();
        super.setKeyPair(keyPair);
        this.signer = new RsaSigner((RSAPrivateKey) keyPair.getPrivate());
        this.customHeaders = customHeaders;
    }

    @Override
    protected String encode(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        String content = createJwtContent(accessToken, authentication);
        String token = JwtHelper.encode(content, this.signer, this.customHeaders)
                .getEncoded();
        return token;
    }

    private String createJwtContent(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        String content;
        try {
            Map accessTokenMap = getAccessTokenConverter().convertAccessToken(accessToken, authentication);
            if (authentication.getUserAuthentication() instanceof OAuth2AuthenticationToken) {
                Optional.ofNullable(((OAuth2AuthenticationToken) authentication.getUserAuthentication()).getAuthorizedClientRegistrationId())
                        .ifPresent(s -> {
                            accessTokenMap.put("registration_id", s);
                            accessTokenMap.remove("client_id");
                        });
            }
            content = this.objectMapper.formatMap(accessTokenMap);
        } catch (Exception ex) {
            throw new IllegalStateException("Cannot convert access token to JSON", ex);
        }
        return content;
    }

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        OAuth2RefreshToken refreshToken = accessToken.getRefreshToken();
        accessToken = super.enhance(accessToken, authentication);
        try {
            UUID.fromString(refreshToken.getValue());
        } catch (IllegalArgumentException exception) {
            DefaultOAuth2AccessToken result = new DefaultOAuth2AccessToken(accessToken);
            result.setRefreshToken(refreshToken);
            return result;
        }
        return accessToken;
    }

}