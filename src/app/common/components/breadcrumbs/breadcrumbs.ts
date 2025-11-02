import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Breadcrumb } from './breadcrumb.model';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  readonly breadcrumbs = input<Breadcrumb[] | undefined>();
}
