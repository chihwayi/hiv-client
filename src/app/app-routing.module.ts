import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { RoleManagementComponent } from './components/admin/role-management/role-management.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'admin/roles', component: RoleManagementComponent, canActivate: [authGuard] },
  { path: 'role-management', component: RoleManagementComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
