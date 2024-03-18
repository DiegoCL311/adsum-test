import { Routes } from '@angular/router';
import { UserCreateFormComponent } from './pages/user-create-form/user-create-form.component';
import { UserIndexTableComponent } from './pages/user-index-table/user-index-table.component';
import { UserUpdateDeleteComponent } from './pages/user-update-delete/user-update-delete.component';

export const routes: Routes = [
  { path: '', component: UserCreateFormComponent },
  { path: 'all', component: UserIndexTableComponent },
  { path: ':id', component: UserUpdateDeleteComponent },
];
