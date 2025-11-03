import { importProvidersFrom, NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { provideRouter } from '@angular/router';
import {
  formErrorMessagesConfig,
  provideFormErrorMessages,
} from '@core/form-error-messages.config';
import { ChevronRight, House, LucideAngularModule, Pencil, Search, Trash, X } from 'lucide-angular';

@NgModule({
  providers: [
    provideZonelessChangeDetection(),
    provideRouter([]),
    provideFormErrorMessages(formErrorMessagesConfig),
    importProvidersFrom(
      LucideAngularModule.pick({ House, ChevronRight, Trash, Pencil, X, Search })
    ),
  ],
})
class TestingModule {}

getTestBed().initTestEnvironment([BrowserTestingModule, TestingModule], platformBrowserTesting());
