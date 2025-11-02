import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-employee-form-footer',
  templateUrl: './employee-form-footer.html',
  styleUrl: './employee-form-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormFooter {
  readonly footer = viewChild<ElementRef>('footer');
}
