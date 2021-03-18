import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginregister',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  registerMode = false;
  authForm: FormGroup;

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm() {
    this.authForm = new FormGroup({
      login: new FormControl(null, Validators.required),
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
    console.log(this.authForm.value);
  }
}
