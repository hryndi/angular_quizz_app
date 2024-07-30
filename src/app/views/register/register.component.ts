import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { updateProfile } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  isLoading = false;
  hasError = false;

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required, Validators.minLength(6)],
    confirm_password: ['', Validators.required, Validators.minLength(6)],
  });
  errorMessage: string | null = null;
  onSubmit() {
    this.isLoading = false;
    this.hasError = false;
    const form = this.form.getRawValue();
    if (form.password !== form.confirm_password) {
      this.hasError = true;
      this.errorMessage = 'Check your password validation';
    }
    if (form.password.length < 6) {
      this.hasError = true;
      this.errorMessage = 'The password should contain at least 6 characters';
    }

    if (this.form.invalid) {
      return;
    }

    console.log(form.username);
    this.authService
      .register(form.email, form.username, form.password)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.hasError = true;
          this.errorMessage = error.code;
        },
      });
    console.log(this.authService.currentUserSig());
  }
}
