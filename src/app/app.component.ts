import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { AuthService } from './services/auth.service';
import { Auth, onAuthStateChanged, User, user } from '@angular/fire/auth';
import { TUserCredentials } from '../../types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  auth = inject(Auth);
  authService = inject(AuthService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  // unsubscribe;-
  ngOnInit(): void {
    const subscription = this.authService.user$.subscribe(
      (user: User | null) => {
        if (user) {
          this.authService.currentUserSig.set({
            email: user.email!,
            username: user.displayName!,
          });
        } else {
          this.authService.currentUserSig.set(null);
        }
        console.log(this.authService.currentUserSig());
      }
    );
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
