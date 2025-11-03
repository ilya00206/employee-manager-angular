import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employee-form-footer',
  templateUrl: './employee-form-footer.html',
  styleUrl: './employee-form-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormFooter {}
