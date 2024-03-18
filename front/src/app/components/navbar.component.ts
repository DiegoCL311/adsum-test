import { Component } from '@angular/core';

import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
