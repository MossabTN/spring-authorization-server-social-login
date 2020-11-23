import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AccountService} from "./account.service";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(protected router: Router, private accountService: AccountService) {
  }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const authorities = route.data['authorities'];
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): Observable<boolean> {
        return this.accountService.identity().pipe(
            map(account => {
                if (!authorities || authorities.length === 0) {
                    return true;
                }
                if (account) {
                    const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
                    if (hasAnyAuthority) {
                        return true;
                    }
                    this.router.navigate(['/home']);
                    return false;
                }
                this.router.navigate(['/login']);
                return false;
            })
        );
    }
}
