import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-loginregister',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  registerMode = false;
  authForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

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
  }
}
