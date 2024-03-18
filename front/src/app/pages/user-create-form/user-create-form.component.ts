import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
import { NavbarComponent } from '../../components/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-create-form',
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
  templateUrl: './user-create-form.component.html',
})
export class UserCreateFormComponent implements OnInit {
  userForm!: FormGroup;
  categories!: ICategory[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: userService,
    private categoryService: categoryService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      companyName: ['', Validators.required],
      categoryId: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('VALIDO', this.userForm.value);
      this.userService.createUser(this.userForm.value).subscribe((response) => {
        console.log('RESPONSE', response);
        this.toast.success('Usuario creado');
        this.router.navigate(['/all']);
      });
    } else {
      console.log('INVALIDO', this.userForm.controls);
      this.userForm.markAllAsTouched();
    }
  }
}
