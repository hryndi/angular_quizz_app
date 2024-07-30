import { CanActivateFn, CanMatchFn, Router, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UserQuizListComponent } from './views/user-quiz-list/user-quiz-list.component';
import { DestroyRef, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Auth, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

const authCanActivate: CanActivateFn = (route, segmennts) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const destroyRef = inject(DestroyRef);
  return new Observable<boolean>((observer) => {
    const subscription = authService.user$.subscribe((user: User | null) => {
      if (user) {
        observer.next(true);
        observer.complete();
      } else {
        router.navigateByUrl('/sign-in');
        observer.next(false);
        observer.complete();
      }
    });
    destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  });
};

export const routes: Routes = [
  {
    path: 'sign-up',
    component: RegisterComponent,
  },
  {
    path: 'sign-in',
    component: LoginComponent,
  },
  {
    path: '',
    component: UserQuizListComponent,
    canActivate: [authCanActivate],
  },
];
