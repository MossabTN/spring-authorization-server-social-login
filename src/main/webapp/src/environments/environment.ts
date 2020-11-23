// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The getMyTasks of which env maps to which file can be found in `.angular-cli.json`.

import {AuthConfig} from "angular-oauth2-oidc";

const url: string = 'http://localhost:8080';

export function authConfig(url: string): AuthConfig {
    return {
        tokenEndpoint: url + '/oauth/token',
        userinfoEndpoint: url + '/oauth/userinfo',
        loginUrl: url + '/oauth/social/google',
        redirectUri: window.location.origin + '/',
        clientId: 'client',
        dummyClientSecret: 'password',
        responseType: 'password',
        //silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
        scope: 'web',
        useSilentRefresh: true,
        silentRefreshTimeout: 5000,
        timeoutFactor: 0.25,
        sessionChecksEnabled: true,
        showDebugInformation: true,
        clearHashAfterLogin: false,
        nonceStateSeparator: 'semicolon',
        oidc: false,
        useHttpBasicAuth: true,
        requireHttps: false,
    }
}

export const environment = {
    production: false,
    apis: {
        backend: url
    },
    oauth: authConfig(url)
}