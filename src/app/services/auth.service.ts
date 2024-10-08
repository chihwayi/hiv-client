import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model'; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;
  private loginUrl = 'http://localhost:8081/api/auth/login'; 
  private registerUrl = 'http://localhost:8081/api/auth/register'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { usernameOrEmail, password })
      .pipe(map(response => {
        // Store the JWT token in local storage
        console.log('Login successful:', response);  // Debug: log the entire response
        localStorage.setItem('token', response.token);
  
        // Map roles to Role objects
        const roles = response.roles.map((roleName: string) => ({ name: roleName }));
        const user = { ...response, roles }; // Create a user object with roles as Role[]
        this.setUser(user);  // This will store user and roles
        console.log('Roles assigned to user:', user.roles);  // Debug: log roles
  
        return response;
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Login failed'));
      }));
  }
  
  

  register(username: string, password: string, email: string, roles: string[]): Observable<any> {
    return this.http.post<any>(`${this.registerUrl}`, {
        username,
        password,
        email,
        roles
    }, { responseType: 'text' as 'json' })
    .pipe(
        catchError(error => {
            console.error('Registration failed', error);
            return throwError(() => new Error('Registration failed')); // Updated throwError to use the correct function signature
        })
    );
}
  
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
        const user = JSON.parse(userJson) as User;
        console.log('Current user:', user);  // Debug: log the user
        return user;
    }
    return null;
}

  hasRole(roleName: string): boolean {
    // Check if user is logged in and has roles
    if (this.user && this.user.roles) {
      // Type assertion to ensure roles are an array of strings
      return this.user.roles.some(role => role.name === roleName); // Check if any role matches
    }
    return false; // Return false if user is not logged in or has no roles
  }
  

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }  
  
}
