import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';

import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {SocialAuthServiceConfig} from "angularx-social-login";
import {SocialLoginModule, GoogleLoginProvider} from "angularx-social-login";


const routing:Routes=[
  {path:'', component:HomeComponent},
  {path:'list', component: ListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routing),
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '280341750781-je02vpgagcscsvf7hfghml1v4f5v1svd.apps.googleusercontent.com'
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
