import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth, EmailAuthProvider } from '@angular/fire/auth';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB60uek9iJH24JnDnWLZV3SlnUZjcZrgGA',
  authDomain: 'angular-quizz-app.firebaseapp.com',
  projectId: 'angular-quizz-app',
  storageBucket: 'angular-quizz-app.appspot.com',
  messagingSenderId: '696104802808',
  appId: '1:696104802808:web:f7ba154fb5531f5e999e0d',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};

// provideFirebaseApp(() => initializeApp(firebaseConfig)),
// provideAuth(() => getAuth()),
