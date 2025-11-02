import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { employeeSortOptions } from '../../data/employee-sort-options';

@Component({
  selector: 'app-employee-sort',
  imports: [FormsModule],
  templateUrl: './employee-sort.html',
  styleUrl: './employee-sort.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSort {
  readonly sort = model.required<string>();
  readonly sortOptions = employeeSortOptions;
}
