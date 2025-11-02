import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialog {
  readonly dialogRef = inject(DialogRef);
  readonly data = inject(DIALOG_DATA);
}
