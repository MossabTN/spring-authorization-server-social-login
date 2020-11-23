import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {AuthInterceptor} from "./core/interceptor/auth.interceptor";
import {FooterComponent, NavbarComponent} from "./layouts";
import {TasksComponent} from "./components/tasks/container/tasks.component";
import {TaskService} from "./components/tasks/services/task.service";
import {LoginComponent} from "./core/auth/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatDividerModule} from "@angular/material/divider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatOptionModule} from "@angular/material/core";
import {OAuthModule, OAuthModuleConfig} from "angular-oauth2-oidc";

const authModuleConfig: OAuthModuleConfig = {
    resourceServer: {
        allowedUrls: ['http://localhost:8080'],
        sendAccessToken: true,
        customUrlValidation : (url: string) => {
            return !url.includes('oauth/token')
        }
    },
};

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        TasksComponent,
        HomeComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        OAuthModule.forRoot(authModuleConfig),
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatProgressSpinnerModule
    ],
    providers: [
        TaskService,

    ],
    bootstrap: [AppComponent]
})


export class AppModule {
}