import { ChangeDetectionStrategy, Component, linkedSignal, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-employee-search',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './employee-search.html',
  styleUrl: './employee-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSearch {
  readonly search = model.required<string>();
  readonly searchSignal = linkedSignal(() => this.search());
}
