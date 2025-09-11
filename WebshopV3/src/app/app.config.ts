import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {ItemService} from "./service/item.service";
import {ShoppingCartService} from "./service/shoppingCart.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {LoginService} from "./service/login.service";
import {RegisterService} from "./service/register.service";
import {AuthService} from "./service/auth.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),AuthService, LoginService,RegisterService, ItemService, ShoppingCartService, BrowserModule, importProvidersFrom(HttpClientModule)]
};
