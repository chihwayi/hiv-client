import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/role.model';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  users: User[] = [];
  availableRoles: Role[] = [];
  selectedUser: User | null = null;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers() {
    this.roleService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  loadRoles() {
    this.roleService.getRoles().subscribe((roles) => {
      console.log('Roles fetched:', roles); // Debug log
      this.availableRoles = roles;
    }, (error) => {
      console.error('Error fetching roles:', error); // Log any errors
    });
  }
  

  selectUser(user: User) {
    this.selectedUser = user;
  }

  userHasRole(roleName: string): boolean {
    if (this.selectedUser) {
      return this.selectedUser.roles.some(role => role.name === roleName);
    }
    return false;
  }

  toggleRole(role: Role, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (this.selectedUser) {
      if (isChecked) {
        // Add the role if it is checked and not already present
        if (!this.userHasRole(role.name)) {
          this.selectedUser.roles.push(role);
        }
      } else {
        // Remove the role if unchecked
        this.selectedUser.roles = this.selectedUser.roles.filter(r => r.name !== role.name);
      }
    }
  }

  saveRoles() {
    if (this.selectedUser) {
      const rolesToSave = this.selectedUser.roles.map(role => role.name);
      this.roleService.updateUserRoles(this.selectedUser.id, rolesToSave).subscribe(response => {
        console.log('Roles updated:', response);
      });
    }
  }
  
  resetPassword(userId: number) {
    const newPassword = prompt('Enter new password:');
    if (newPassword) {
      this.roleService.resetPassword(userId, newPassword).subscribe(response => {
        console.log('Password reset:', response);
      });
    }
  }

  deleteUser(userId: number) {
    this.roleService.deleteUser(userId).subscribe(response => {
      console.log('User deleted:', response);
      this.loadUsers();
    });
  }
}
