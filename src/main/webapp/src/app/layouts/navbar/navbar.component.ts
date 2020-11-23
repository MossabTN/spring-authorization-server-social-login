import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../core/auth/account.service";
import {Account} from "../../core/auth/auth.model";
import {Router} from "@angular/router";


@Component({
    selector: 'app-nav',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    userDetails: Account = null;

    constructor(private router: Router, private accountService: AccountService) {
    }

    ngOnInit() {
        this.accountService.getAuthenticationState()
            .subscribe(value => {
                this.userDetails = value;
            })
    }

    doLogout() {
        this.accountService.logout()
            .subscribe(() => {
                this.router.navigate(['/login']);
            });
    }
}
