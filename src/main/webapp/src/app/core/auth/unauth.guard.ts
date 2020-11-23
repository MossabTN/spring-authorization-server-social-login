import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AccountService} from "./account.service";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable()
export class UnauthGuard implements CanActivate {
    constructor(protected router: Router, private accountService: AccountService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.accountService.identity().pipe(
            map(account => {
                if (account) {
                    this.router.navigate(['/home']);
                    return false;
                }
                return true;
            })
        );
    }
}
