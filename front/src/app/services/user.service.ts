import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

export interface ApiResponse<T> {
  message?: string;
  data: T;
}
@Injectable({
  providedIn: 'root',
})
export class userService {
  apiurl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiurl}/all`);
  }

  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiurl}/${id}`);
  }

  createUser(User: IUser): Observable<any> {
    return this.http.post(`${this.apiurl}/new`, User);
  }

  updateUser(id: string, User: IUser): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, User);
  }

  deleteUser(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/${id}`);
  }
}
