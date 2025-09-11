import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {NgIf} from "@angular/common";
import {RegisterService} from "../service/register.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private loginService: LoginService, private registerService: RegisterService) {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }


  async onSubmit(authForm: NgForm) {
    const value = authForm.value
    if (this.isLoginMode) {
      this.loginService.login(value.username, value.password)
    } else {
      this.registerService.Registreer(value.username, value.email, value.password)
      await new Promise(f => setTimeout(f, 1000));
      this.loginService.login(value.username, value.password)
    }


  }
}
