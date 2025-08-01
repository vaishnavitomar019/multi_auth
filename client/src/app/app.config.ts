import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // importProvidersFrom(SocialLoginModule),
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           '907687285228-gsfg9v0r23u4fi7ehps86p9aml5ie3bg.apps.googleusercontent.com '
    //         ),
    //       },
    //     ],
    //   } as SocialAuthServiceConfig,
    // },
  ],
};
