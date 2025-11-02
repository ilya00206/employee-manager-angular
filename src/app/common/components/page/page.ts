import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { Breadcrumbs } from '../breadcrumbs/breadcrumb.model';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-page',
  imports: [BreadcrumbsComponent],
  templateUrl: './page.html',
  styleUrl: './page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page {
  private readonly router = inject(ActivatedRoute);

  readonly heading = toSignal(
    this.router.data.pipe(
      map((data) => data['heading']),
      filter((heading) => !!heading)
    )
  );

  readonly breadcrumbs = toSignal(
    this.router.data.pipe(
      map((data) => data['breadcrumbs']),
      filter((breadcrumbs) => !!breadcrumbs),
      map((breadcrumbs: Breadcrumbs) => breadcrumbs.data)
    )
  );
}
