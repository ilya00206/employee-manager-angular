import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainComponent } from './main/main.component';
import { Header } from './header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [MainComponent, Header, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
