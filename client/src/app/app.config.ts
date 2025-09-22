// CORRECT app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MarkdownModule, MARKED_OPTIONS } from 'ngx-markdown'; // Import MARKED_OPTIONS
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import hljs from 'highlight.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      MarkdownModule.forRoot({
        markedOptions: {
          provide: MARKED_OPTIONS, // Use MARKED_OPTIONS token
          useValue: {
            gfm: true,
            breaks: true,
            pedantic: false,
            smartLists: true,
            smartypants: false,
            highlight: (code: string, lang: string) => {
              if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
              }
              return hljs.highlightAuto(code).value;
            }
          }
        }
      })
    )
  ],
};

