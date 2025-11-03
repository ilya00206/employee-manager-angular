import { inject, Injectable, EnvironmentProviders, Provider } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot) {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      this.title.setTitle(this.getAppTitle(title));
    }
  }

  private getAppTitle(title: string) {
    return `${title} - e-Firma`;
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
