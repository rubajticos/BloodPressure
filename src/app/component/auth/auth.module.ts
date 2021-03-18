import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './loginregister/login-register.component';

const routes: Routes = [{ path: '', component: LoginRegisterComponent  }];


@NgModule({
  declarations: [LoginRegisterComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [LoginRegisterComponent]
})
export class AuthModule { }
