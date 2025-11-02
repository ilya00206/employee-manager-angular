import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CardComponent } from '../../../../common/ui/card/card';
import { Employee } from '../../models/employee';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-card, [appEmployeeCard]',
  imports: [CardComponent, LucideAngularModule, RouterLink],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCard {
  readonly employee = input.required<Employee>();

  readonly update = output<Employee>();
  readonly delete = output<Employee>();
}
