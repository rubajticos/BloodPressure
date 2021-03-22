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
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
          })
          .then(() => alert('Rejestracja powiodła się!'));
      }
    }
  }
}
