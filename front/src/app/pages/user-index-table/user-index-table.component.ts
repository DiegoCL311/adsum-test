import { Component, OnInit, signal } from '@angular/core';
import { IUser } from '../../models/user';
import { userService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header.component';
import { NavbarComponent } from '../../components/navbar.component';

@Component({
  selector: 'user-index-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    HttpClientModule,
    RouterModule,
    NavbarComponent,
  ],
  templateUrl: './user-index-table.component.html',
})
export class UserIndexTableComponent implements OnInit {
  public users = signal<IUser[]>([]);

  constructor(private userService: userService,) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users.set(data);
        console.log(this.users());
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.getUsers();
  }
}
