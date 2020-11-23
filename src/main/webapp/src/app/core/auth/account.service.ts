import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable, of, ReplaySubject} from 'rxjs';
import {Account, LoginRequest} from "./auth.model";
import {environment} from "../../../environments";
import {catchError, mergeMap, shareReplay, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {OAuthService} from "angular-oauth2-oidc";
import {UserInfo} from "angular-oauth2-oidc/types";


@Injectable({providedIn: 'root'})
export class AccountService {
    private userIdentity: Account | null = null;
    private authenticationState = new ReplaySubject<Account | null>(1);

    constructor(private http: HttpClient, private oAuthService: OAuthService, private router: Router) {
        this.oAuthService.configure(environment.oauth);
        //this.oAuthService.loadDiscoveryDocumentAndTryLogin();
        this.oAuthService.tryLogin({
            disableOAuth2StateCheck: true,
            onTokenReceived: (info) => {
                console.log('state', info);
            }
        }).then(value => {
            if(value){
                this.identity();
            }
        })
    }

    save(account: Account): Observable<{}> {
        return this.http.post(environment.apis.backend + '/api/account', account);
    }

    authenticate(identity: Account | null): void {
        this.userIdentity = identity;
        this.authenticationState.next(this.userIdentity);
    }

    hasAnyAuthority(authorities: string[] | string): boolean {
        if (!this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }
        if (!Array.isArray(authorities)) {
            authorities = [authorities];
        }
        return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
    }

    identity(force?: boolean): Observable<Account | null> {
        return of(this.oAuthService.hasValidAccessToken())
            .pipe(
                mergeMap((isValid) => {
                    if (isValid) {
                        if (!this.userIdentity || force) {
                            return this.fetch().pipe(
                                catchError(() => of(this.userIdentity)),
                                tap((account: Account | null) => {
                                    this.authenticate(account);
                                    if (account) {
                                        //this.router.navigate(['/home']);
                                    }
                                })
                            );
                        }
                        return of(this.userIdentity);
                    } else if(this.oAuthService.getRefreshToken()){
                        return from(this.oAuthService.refreshToken())
                            .pipe(
                                mergeMap(() => {
                                    return this.fetch().pipe(
                                        catchError(() => of(null)),
                                        tap((account: Account | null) => {
                                            this.authenticate(account);
                                            if (account) {
                                                //this.router.navigate(['/home']);
                                            }
                                        })
                                    );
                                }),
                                catchError(() => of(null)),
                            )
                    }
                    return of(null)
                }),
                shareReplay()
            )
    }

    isAuthenticated(): boolean {
        return this.oAuthService.hasValidAccessToken();
    }

    getAuthenticationState(): Observable<Account | null> {
        return this.authenticationState.asObservable();
    }

    getImageUrl(): string {
        return this.userIdentity ? this.userIdentity.imageUrl : '';
    }

    getToken(): string {
        return  this.oAuthService.getAccessToken();
    }

    login(credentials: LoginRequest): Observable<UserInfo | null> {

        return from(this.oAuthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(credentials.username, credentials.password))
            .pipe(
                tap(response => this.authenticate(response))
            )
    }

    loginWithSocialCredentials(provider: string) {
        this.oAuthService.loginUrl = environment.apis.backend+'/oauth/social/'+provider
        this.oAuthService.initLoginFlow();

    }

    logout(): Observable<void> {
        return new Observable(observer => {
            this.oAuthService.logOut()
            this.authenticate(null);
            observer.complete();
        });
    }

    private fetch(): Observable<Account> {
        return from(this.oAuthService.loadUserProfile());
    }


    /*private navigateToStoredUrl(): void {
        // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
        // if login is successful, go to stored previousState and clear previousState
        const previousUrl = this.stateStorageService.getUrl();
        if (previousUrl) {
            this.stateStorageService.clearUrl();
            this.router.navigateByUrl(previousUrl);
        }
    }*/
}
