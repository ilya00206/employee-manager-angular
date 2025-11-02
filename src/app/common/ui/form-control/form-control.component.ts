import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormErrorMessage } from "../form-error-message/form-error-message";

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormErrorMessage],
})
export class FormControlComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly control = input.required<AbstractControl>();
  readonly required = input<boolean>(false);
}
