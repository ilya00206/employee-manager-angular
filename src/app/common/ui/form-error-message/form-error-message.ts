import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { FORM_ERROR_MESSAGES } from '../../../core/form-error-messages.config';

type ErrorMessage = string;

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.html',
  styleUrl: './form-error-message.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorMessage {
  readonly control = input.required<AbstractControl>();
  private readonly errorMessages = inject(FORM_ERROR_MESSAGES);

  readonly errors = toSignal<ErrorMessage[]>(
    toObservable(this.control).pipe(
      switchMap((control) => control.events.pipe(map(() => control))),
      map((control) => this.createErrorMessages(control))
    )
  );

  private createErrorMessages(control: AbstractControl): ErrorMessage[] {
    const { dirty, touched, errors, invalid } = control;
    const shouldShowErrors = invalid && (dirty || touched);
    if (!shouldShowErrors || !errors) {
      return [];
    }

    const errorMessages: ErrorMessage[] = Object.entries(errors).map(([key, value]) =>
      this.errorMessages[key](value)
    );

    return errorMessages;
  }
}
