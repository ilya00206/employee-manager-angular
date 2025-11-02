import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-search',
  imports: [FormsModule],
  templateUrl: './employee-search.html',
  styleUrl: './employee-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSearch {
  readonly search = model.required<string>();
}
