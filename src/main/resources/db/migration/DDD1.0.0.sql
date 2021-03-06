create sequence hibernate_sequence;

alter sequence hibernate_sequence owner to "maxilog-authorization-user";

create table oauth_client_details(
                                     id            bigint generated by default as identity
                                         constraint oauth_client_details_pkey
                                             primary key,
                                     client_id     varchar(255) not null
                                         constraint uk_3my6lp6ttga6hhwtsutscqset
                                             unique,
                                     client_secret varchar(255),
                                     grant_types   varchar(255),
                                     scopes        varchar(255)
);

alter table oauth_client_details
    owner to "maxilog-authorization-user";

create table oauth_user_details
(
    id             bigint generated by default as identity (maxvalue 2147483647)
        constraint users_pkey
            primary key,
    email          varchar(255) not null
        constraint uk6dotkott2kjsp8vw4d0m25fb7
            unique,
    email_verified boolean      not null,
    name           varchar(255) not null,
    password       varchar(255),
    image_url      text
);

alter table oauth_user_details
    owner to "maxilog-authorization-user";

create table oauth_access_token
(
    token_id          varchar(256),
    token             bytea,
    authentication_id text not null
        constraint oauth_access_token_pkey
            primary key,
    user_name         varchar(256),
    client_id         varchar(256),
    authentication    bytea,
    refresh_token     varchar(256)
);

alter table oauth_access_token
    owner to "maxilog-default-user";

grant insert, select, update, delete, truncate, references, trigger on oauth_access_token to public;

grant insert, select, update, delete, truncate, references, trigger on oauth_access_token to public;

create table oauth_refresh_token
(
    token_id       varchar(256),
    token          bytea,
    authentication bytea
);

alter table oauth_refresh_token
    owner to "maxilog-default-user";

grant insert, select, update, delete, truncate, references, trigger on oauth_refresh_token to public;

grant insert, select, update, delete, truncate, references, trigger on oauth_refresh_token to public;

create table oauth2_authorized_client
(
    client_registration_id  varchar(100)                            not null,
    principal_name          varchar(200)                            not null,
    access_token_type       varchar(100)                            not null,
    access_token_value      bytea                                   not null,
    access_token_issued_at  timestamp                               not null,
    access_token_expires_at timestamp                               not null,
    access_token_scopes     varchar(1000) default NULL::character varying,
    refresh_token_value     bytea,
    refresh_token_issued_at timestamp,
    created_at              timestamp     default CURRENT_TIMESTAMP not null,
    constraint oauth2_authorized_client_pkey
        primary key (client_registration_id, principal_name)
);

alter table oauth2_authorized_client
    owner to "maxilog-default-user";

grant insert, select, update, delete, truncate, references, trigger on oauth2_authorized_client to public;

grant insert, select, update, delete, truncate, references, trigger on oauth2_authorized_client to public;

