import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AccountService} from "../account.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form: FormGroup;

  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRouter: ActivatedRoute,
              private accountService: AccountService) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log(this.activatedRouter.snapshot.queryParams)
  }

  login() {
    if (this.form.valid) {
      this.accountService.login(this.form.value)
          .subscribe(value => {
            this.router.navigate(["/home"])
          })
    }
  }

  loginWithProvider(provider: string){
    this.accountService.loginWithSocialCredentials(provider)
  }
}
