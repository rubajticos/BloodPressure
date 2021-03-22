import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService) {
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
    if (this.authForm.valid) {
      const email: string = this.authForm.value.email;
      const password: string = this.authForm.value.password;

      if (this.registerMode) {
        this.authService
          .registerNewUser(email.trim(), password.trim())
          .then((result) => this.onRegisterSuccess())
          .catch((error) => this.onRegisterFailed(error));
      }
    }
  }

  onRegisterSuccess() {
    this.successMessage = 'Zostałeś poprawnie zarejestrowany';
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
    }
  }
}
