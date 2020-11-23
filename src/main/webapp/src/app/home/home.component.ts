import { Component, OnInit } from '@angular/core';
import {AccountService} from "../core/auth/account.service";
import {Account} from "../core/auth/auth.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails: any;

  constructor(private accountService: AccountService) {}

  async ngOnInit() {
    this.accountService.getAuthenticationState()
        .subscribe(value => {
          this.userDetails = value;
        })
  }

}
