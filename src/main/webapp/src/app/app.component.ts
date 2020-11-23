import { Component, OnInit } from '@angular/core';
import {AccountService} from "./core/auth/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userDetails: any;

  constructor(private accountService: AccountService) {}

  async ngOnInit() {/*
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
    }
*/
  }

  async doLogout() {
    await this.accountService.logout();
  }
}
