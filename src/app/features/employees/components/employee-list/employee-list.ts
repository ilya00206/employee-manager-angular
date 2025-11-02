import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Employee } from '../../models/employee';
import { EmployeeCard } from '../employee-card/employee-card';
import { CardComponent } from '../../../../common/ui/card/card';

@Component({
  selector: 'app-employee-list',
  imports: [LucideAngularModule, EmployeeCard, CardComponent],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeList {
  readonly employees = input.required<Employee[]>();

  readonly delete = output<Employee>();
}
