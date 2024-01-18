import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {AuthService} from "./services/auth.service";

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    provideRouter(routes),
    importProvidersFrom([BrowserAnimationsModule]),
    provideAnimations()
]
};
