package io.maxilog.sociallogin.security.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.provider.ClientDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.*;

@Entity(name = "oauth_client_details")
public class Client  implements ClientDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    @NotBlank
    private String clientId;

    @NotBlank
    private String clientSecret;

    @NotBlank
    private String grantTypes;

    @NotBlank
    private String scopes;

    public Client() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public List<String> getGrantTypes() {
        return Arrays.asList(grantTypes.split(", "));
    }

    public void setGrantTypes(String grantTypes) {
        this.grantTypes = grantTypes;
    }

    public String getScopes() {
        return scopes;
    }

    public void setScopes(String scopes) {
        this.scopes = scopes;
    }

    @Override
    public String getClientId() {
        return clientId;
    }

    @Override
    public Set<String> getResourceIds() {
        return Collections.emptySet();
    }

    @Override
    public boolean isSecretRequired() {
        return true;
    }

    @Override
    public String getClientSecret() {
        return clientSecret;
    }

    @Override
    public boolean isScoped() {
        return true;
    }

    //TODO
    @Override
    public Set<String> getScope() {
        return new HashSet<>(new ArrayList<String>(Arrays.asList(scopes.split(", "))));
    }

    //TODO
    @Override
    public Set<String> getAuthorizedGrantTypes() {
        return new HashSet<>(getGrantTypes());
    }

    @Override
    public Set<String> getRegisteredRedirectUri() {
        return Collections.singleton("http://localhost:4200/login");
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("CLIENT"));
    }

    @Override
    public Integer getAccessTokenValiditySeconds() {
        return 15 * 2;
    }

    @Override
    public Integer getRefreshTokenValiditySeconds() {
        return 60 * 60 * 24;
    }

    @Override
    public boolean isAutoApprove(String s) {
        return true;
    }

    @Override
    public Map<String, Object> getAdditionalInformation() {
        return null;
    }
}
