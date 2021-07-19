import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";

import {SocialAuthService} from "angularx-social-login";
import {SocialUser, GoogleLoginProvider} from "angularx-social-login";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: SocialAuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data)=>{
      localStorage.setItem('google-auth',JSON.stringify(data));
      this.router.navigate(['/list']).then();
    });
  }

}
