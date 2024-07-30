import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  // currUser = this.authService.currentUserSig();
  isLoading = false;
  hasError = false;
  destroyRef = inject(DestroyRef);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  router = inject(Router);
  errorMessage: string | null = null;

  onSubmit(btn: HTMLButtonElement) {
    this.isLoading = true;
    this.hasError = false;

    const form = this.form.getRawValue();

    const passwordSubscription = this.authService
      .login(form.email, form.password)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigateByUrl('/');
        },

        error: (error) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = error.message;
        },
      });

    const logSubscription = this.authService.user$.subscribe(
      (user: User | null) => {
        console.log(this.authService.currentUserSig());
      }
    );
    this.destroyRef.onDestroy(() => {
      passwordSubscription.unsubscribe();
      logSubscription.unsubscribe();
    });
  }
}
