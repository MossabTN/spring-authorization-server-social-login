package io.maxilog.sociallogin.security.repository;

import io.maxilog.sociallogin.security.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findFirstByClientId(String clientId);

}
