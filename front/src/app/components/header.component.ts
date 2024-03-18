import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-header-component',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() title = 'Titulo!!';
}
