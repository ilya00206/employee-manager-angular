import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormErrorMessage } from '../form-error-message/form-error-message';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.html',
  styleUrl: './form-control.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormErrorMessage],
})
export class FormControl {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly control = input.required<AbstractControl>();
  readonly required = input<boolean>(false);
}
