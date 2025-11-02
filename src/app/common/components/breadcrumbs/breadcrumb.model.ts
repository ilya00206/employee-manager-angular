export interface Breadcrumb {
  readonly label: string;
  readonly routerLink?: string[];
  readonly icon?: string;
}

export class Breadcrumbs {
  constructor(readonly data: Breadcrumb[]) {
    this.data = [
      {
        label: 'Strona główna',
        routerLink: ['/'],
        icon: 'house',
      },
      ...data,
    ];
  }
}
