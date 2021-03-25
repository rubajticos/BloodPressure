import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-loginregister',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  registerMode = false;
  authForm: FormGroup;
  error: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  getTitle() {
    return this.registerMode ? 'Rejestracja' : 'Logowanie';
  }

  getSubmitText() {
    return this.registerMode ? 'Zarejestruj się' : 'Zaloguj się';
  }

  getToggleModeText() {
    return this.registerMode
      ? 'Przełącz na logowanie'
      : 'Przełącz na rejestrację';
  }

  toggleMode() {
    this.registerMode = !this.registerMode;
    this.authForm.reset();
  }

  onSubmit() {
    this.resetMessages();

    if (this.authForm.valid) {
      const email: string = this.authForm.value.email;
      const password: string = this.authForm.value.password;

      if (this.registerMode) {
        this.authService
          .registerNewUser(email.trim(), password.trim())
          .then((result) => this.onRegisterSuccess())
          .catch((error) => this.onRegisterFailed(error));
      } else {
        this.authService
          .login(email.trim(), password.trim())
          .then((result) => this.onLoginSuccess())
          .catch((error) => this.onLoginFailed(error));
      }
    }
  }

  onRegisterSuccess() {
    this.successMessage =
      'Zostałeś poprawnie zarejestrowany. Możesz się zalogować.';
    setTimeout(() => {
      this.authForm.reset();
      this.resetMessages();
      this.toggleMode();
    }, 2000);
  }

  onRegisterFailed(error: any) {
    const errorCode = error.code;
    this.handleRegisterError(errorCode);
  }

  handleRegisterError(errorCode: any) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        this.error = 'Podany e-mail jest zajęty';
        break;
      case 'auth/invalid-email':
        this.error = 'E-mail jest nieprawidłowy';
        break;
      case 'auth/operation-not-allowed':
        this.error = 'Wystąpił błąd.';
        break;
      case 'auth/weak-password':
        this.error = 'Hasło jest zbyt słabe';
        break;
      case 'auth/too-many-requests':
        this.error = 'Spróbuj ponownie za chwilę';
        break;
    }
  }

  onLoginSuccess() {
    this.successMessage = 'Zostałeś poprawnie zalogowany.';
    setTimeout(() => {
      this.authForm.reset();
      this.resetMessages();
      this.navigateToDiary();
    }, 2000);
  }

  navigateToDiary() {
    this.router.navigate(['/diary']);
  }
  onLoginFailed(error: any) {
    const errorCode = error.code;
    this.handleLoginError(errorCode);
  }

  handleLoginError(errorCode: any) {
    switch (errorCode) {
      case 'auth/invalid-email':
        this.error = 'E-mail jest nieprawidłowy';
        break;
      case 'auth/user-disabled':
        this.error = 'Twoje konto jest wyłączone.';
        break;
      case 'auth/user-not-found':
        this.error = 'Twoje konto nie istenieje. Zarejestruj się';
        break;
      case 'auth/wrong-password':
        this.error = 'Podane hasło jest nieprawidłowe';
        break;
      case 'auth/too-many-requests':
        this.error = 'Spróbuj ponownie za chwilę';
        break;
    }
  }

  resetMessages() {
    this.error = '';
    this.successMessage = '';
  }
}
