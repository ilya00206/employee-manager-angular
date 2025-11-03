import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { ChevronRight, House, LucideAngularModule, Pencil, Search, Trash, X } from 'lucide-angular';
import { routes } from './app.routes';
import { provideFormErrorMessages } from './core/form-error-messages.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideHttpClient(withFetch()),
    provideFormErrorMessages(),
    importProvidersFrom(
      LucideAngularModule.pick({ House, ChevronRight, Trash, Pencil, X, Search })
    ),
  ],
};
