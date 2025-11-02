import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-required-helper',
  templateUrl: './required-helper.html',
  styleUrl: './required-helper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequiredHelper {}
