import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-navigation-back',
  imports: [],
  templateUrl: './navigation-back.html',
  styleUrl: './navigation-back.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBack {
  readonly label = input<string>('Cofnij');
  private readonly location = inject(Location);

  onCancel(): void {
    this.location.back();
  }
}
