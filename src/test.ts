import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { provideRouter } from '@angular/router';

@NgModule({
  providers: [provideZonelessChangeDetection(), provideRouter([])],
})
class ZonelessModule {}

getTestBed().initTestEnvironment([BrowserTestingModule, ZonelessModule], platformBrowserTesting());
