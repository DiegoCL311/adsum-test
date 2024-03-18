import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ICategory } from '../../models/category';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header.component';
import { userService } from '../../services/user.service';
import { categoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../components/navbar.component';

@Component({
  selector: 'app-user-update-delete',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent,
  ],
  templateUrl: './user-update-delete.component.html',
})
export class UserUpdateDeleteComponent implements OnInit {
  userForm!: FormGroup;
  userId!: string;
  categories!: ICategory[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: userService,
    private categoryService: categoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) {
    this.userForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      companyName: ['', Validators.required],
      categoryId: ['', Validators.required],
      message: ['', Validators.required],
    });
    this.userId = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe({
      next: (data) => {
        if (data === null) {
          this.toast.error('Usuario no encontrado');
          this.router.navigate(['/all']);
        }
        console.log('user', data);
        this.userForm.setValue({
          fullname: data.fullname,
          companyName: data.companyName,
          email: data.email,
          phone: data.phone,
          categoryId: data.categoryId,
          message: data.message,
        });
      },
    });

    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  onUpdate() {
    if (this.userForm.valid) {
      console.log('VALIDO', this.userForm.value);
      this.userService
        .updateUser(this.userId, this.userForm.value)
        .subscribe((response) => {
          console.log('RESPONSE', response);
          this.toast.success('Actualizado con exito');
        });
    } else {
      console.log('INVALIDO', this.userForm.controls);
      this.userForm.markAllAsTouched();
    }
  }

  onDelete() {
    this.userService.deleteUser(this.userId).subscribe((response) => {
      console.log('RESPONSE', response);
      this.toast.success('Eliminado con exito');
      this.router.navigate(['/all']);
    });
  }
}
