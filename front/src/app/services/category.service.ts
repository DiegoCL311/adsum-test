import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category';

export interface ApiResponse<T> {
  message?: string;
  data: T;
}
@Injectable({
  providedIn: 'root',
})
export class categoryService {
  apiurl = 'http://localhost:3000/categories';
  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiurl}/all`);
  }
}
