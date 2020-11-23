package io.maxilog.sociallogin.security.service;

import io.maxilog.sociallogin.security.repository.ClientRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.ClientRegistrationException;
import org.springframework.stereotype.Service;


@Service
@Primary
public class ClientDetailsServiceImpl implements ClientDetailsService {

    private final ClientRepository clientRepository;

    public ClientDetailsServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public ClientDetails loadClientByClientId(String s) {
        return clientRepository.findFirstByClientId(s)
                .orElseThrow(() -> new ClientRegistrationException("Could not find client: " + s));
    }

}
