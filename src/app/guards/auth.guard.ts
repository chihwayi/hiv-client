import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Get current user from the AuthService
  const user = authService.getCurrentUser();

  // Check if user and user.roles are defined and if user has the "Admin" role
  if (user && user.roles && user.roles.some(role => role.name === 'ROLE_ADMIN') && localStorage.getItem('token')) {
    return true; // Allow access if user is Admin and has a valid token
  }

  // Redirect to login page if not authorized
  router.navigate(['/login']);
  return false;
};
