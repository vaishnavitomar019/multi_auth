import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    this.isSubmitting = true;

    if (this.loginForm.invalid) {
      console.log('Form invalid');
      return;
    }
    this.errorMessage = '';
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
          this.router.navigate(['/login/success'], { queryParams: { token: res.token } });
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
        this.isSubmitting = false;
      },
    });

  }
  goToRegister() {
    this.router.navigate(['/register'])
  }

  signInWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

}


