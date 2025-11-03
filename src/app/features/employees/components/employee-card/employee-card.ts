import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '@common/components/card/card';
import { LucideAngularModule } from 'lucide-angular';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-card, [appEmployeeCard]',
  imports: [Card, LucideAngularModule, RouterLink],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCard {
  readonly employee = input.required<Employee>();
  readonly update = output<Employee>();
  readonly delete = output<Employee>();
}
