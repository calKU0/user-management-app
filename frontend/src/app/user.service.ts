import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';
  private usersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  getUsers(): Observable<any[]> {
    return this.usersSubject.asObservable();
  }

  private loadUsers(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (users) => {
        this.usersSubject.next(users);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(tap(() => this.loadUsers()));
  }

  updateUser(user: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/${user._id}`, user)
      .pipe(tap(() => this.loadUsers()));
  }
}
