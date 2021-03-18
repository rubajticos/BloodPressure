import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './loginregister/login-register.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: LoginRegisterComponent }];

@NgModule({
  declarations: [LoginRegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [LoginRegisterComponent],
})
export class AuthModule {}
