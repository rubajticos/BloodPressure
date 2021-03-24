import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly authState: Observable<firebase.User | null> = this.auth.authState;

  constructor(private auth: AngularFireAuth) {}

  get user(): Promise<firebase.User | null> {
    return this.auth.currentUser;
  }

  registerNewUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}
