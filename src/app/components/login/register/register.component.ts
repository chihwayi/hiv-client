import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],  // Corrected 'name' to 'username'
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: ['', Validators.required]  // Bind roles properly
    });
  }

  register(): void {
    if (this.registerForm.valid) {
        const { username, password, email, roles } = this.registerForm.value;
        this.authService.register(username, password, email, [roles])
            .subscribe(
                response => {
                    console.log('Registration successful:', response);
                    this.router.navigate(['/login']);
                },
                error => {
                    // Log more detailed error information
                    console.error('Registration failed:', error);
                    if (error instanceof HttpErrorResponse) {
                        console.error('HTTP error response:', error);
                    }
                }
            );
    }
}


}
