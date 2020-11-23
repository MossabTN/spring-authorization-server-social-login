package io.maxilog.sociallogin.security.mapper;

import org.springframework.jdbc.core.SqlParameterValue;
import org.springframework.security.oauth2.client.JdbcOAuth2AuthorizedClientService;

import java.sql.Types;
import java.util.List;

import static java.util.stream.Collectors.toList;

public class PostgreSqlOAuth2AuthorizedClientParametersMapper extends JdbcOAuth2AuthorizedClientService.OAuth2AuthorizedClientParametersMapper {
    @Override
    public List<SqlParameterValue> apply(JdbcOAuth2AuthorizedClientService.OAuth2AuthorizedClientHolder authorizedClientHolder) {
        return super.apply(authorizedClientHolder).stream()
                .map(parameter -> parameter.getSqlType() == Types.BLOB
                        ? new SqlParameterValue(Types.BINARY, parameter.getValue()) : parameter)
                .collect(toList());
    }
}