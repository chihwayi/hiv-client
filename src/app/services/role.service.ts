import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model'; 
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:8081/api/admin'; // Updated to match your Spring Boot endpoint

  constructor(private http: HttpClient) {}

  // Helper method to get headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }  

  // 1. Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers: this.getHeaders() });
  }

  // 2. Update roles for a specific user
  /*
  updateUserRoles(userId: number, newRoles: string[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/roles`, newRoles, { headers: this.getHeaders() });
  }
   */
  updateUserRoles(userId: number, roles: string[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/roles`, roles, {headers: this.getHeaders()});
  }
  

  // 3. Delete a user by ID
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers: this.getHeaders() });
  }

  // 4. Reset user password
  resetPassword(userId: number, newPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/reset-password`, newPassword, { headers: this.getHeaders() });
  }

  // 5. Get all available roles
  getRoles(): Observable<Role[]> {
    console.log('Fetching roles...');
    return this.http.get<Role[]>(`${this.apiUrl}/roles`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Roles received:', response)),
        catchError(error => {
          if (error.status === 403) {
            console.error('Error 403: Access denied. The user does not have permission to access this resource.');
            alert('You do not have permission to view the roles.');
          } else {
            console.error('Error fetching roles:', error);
            alert('An error occurred while fetching roles. Please try again later.');
          }
          return throwError(error);
        })
      );
  }
  
  
}
