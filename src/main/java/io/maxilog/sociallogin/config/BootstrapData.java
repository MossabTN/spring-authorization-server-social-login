package io.maxilog.sociallogin.config;

import io.maxilog.sociallogin.security.domain.Client;
import io.maxilog.sociallogin.security.repository.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


//@Component
public class BootstrapData implements CommandLineRunner {

    public static final String FIRST_RUN_CONFIG_NAME = "firstRun";
    public static final String FIRST_RUN_CONFIG_VALUE = "true";

    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;

    public BootstrapData(ClientRepository clientRepository, PasswordEncoder passwordEncoder) {
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void run(String... args) throws Exception {
        System.out.println("+++++++++++++++++++++");
        Client client1 = new Client();
        client1.setClientId("client");
        client1.setClientSecret(passwordEncoder.encode("password"));
        client1.setGrantTypes("refresh_token, password, client_credentials");
        client1.setScopes("web");
        clientRepository.save(client1);

        Client client2 = new Client();
        client2.setClientId("client2");
        client2.setClientSecret(passwordEncoder.encode("password"));
        client2.setGrantTypes("implicit");
        client2.setScopes("web");
        clientRepository.save(client2);
    }
}