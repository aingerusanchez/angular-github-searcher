import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="empty">
      <img src="{{ image }}" alt="">
      <h2>{{ title }}</h2>
      <p [innerHTML]="text"></p>
    </section>
  `,
  styleUrl: './empty.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent {
  @Input() image = '';
  @Input({ required: true }) title = '';
  @Input({ required: true }) text = '';

}
