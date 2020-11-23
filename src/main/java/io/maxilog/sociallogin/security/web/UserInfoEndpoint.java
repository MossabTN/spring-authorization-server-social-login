package io.maxilog.sociallogin.security.web;

import io.maxilog.sociallogin.domain.User;
import io.maxilog.sociallogin.repository.UserRepository;
import io.maxilog.sociallogin.security.dto.UserPrincipal;
import io.maxilog.sociallogin.web.errors.ResourceNotFoundException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.provider.endpoint.FrameworkEndpoint;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@FrameworkEndpoint
public class UserInfoEndpoint {

    private final UserRepository userRepository;

    public UserInfoEndpoint(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/oauth/userinfo")
    @ResponseBody
    public User getUserinfo(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}