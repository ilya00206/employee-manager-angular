import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Employee } from '../../models/employee';
import { EmployeeCard } from '../employee-card/employee-card';
import { Card } from '../../../../common/components/card/card';

@Component({
  selector: 'app-employee-list',
  imports: [LucideAngularModule, EmployeeCard, Card],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeList {
  readonly employees = input.required<Employee[]>();

  readonly delete = output<Employee>();
}
