import { inject, Injectable, EnvironmentProviders, Provider } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { APP_NAME } from './app-name';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly appName = inject(APP_NAME);

  override updateTitle(snapshot: RouterStateSnapshot) {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      this.title.setTitle(this.getAppTitle(title));
    }
  }

  private getAppTitle(title: string) {
    return `${title} - ${this.appName}`;
  }
}

export function provideTitleStrategy(): (EnvironmentProviders | Provider)[] {
  return [
    {
      provide: TitleStrategy,
      useClass: AppTitleStrategy,
    },
  ];
}
