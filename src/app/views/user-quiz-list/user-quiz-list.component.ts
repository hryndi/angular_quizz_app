import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-quiz-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-quiz-list.component.html',
  styleUrl: './user-quiz-list.component.css',
})
export class UserQuizListComponent {
  authService = inject(AuthService);
  auth = inject(Auth);
  onClick() {
    this.authService.logout();
    console.log(
      this.auth.onAuthStateChanged((user) => {
        console.log(user);
      })
    );
  }
}
