import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard-top-bar',
  templateUrl: './dashboard-top-bar.component.html',
  styleUrl: './dashboard-top-bar.component.css'
})
export class DashboardTopBarComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  isAdmin(): boolean {
    const currentUser: User | null = this.authService.getCurrentUser();
    console.log('Checking if user is admin. Current user:', currentUser);  // Debug: log current user details
    const isAdmin = currentUser?.roles?.some(role => role.name === 'ROLE_ADMIN'); // Check role.name
    console.log('Is Admin:', isAdmin);  // Debug: log whether the user is an admin
    return !!isAdmin;
  }
  

}
