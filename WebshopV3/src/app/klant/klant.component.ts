import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-klant',
  standalone: true,
  imports: [],
  templateUrl: './klant.component.html',
  styleUrl: './klant.component.css'
})
export class KlantComponent {
  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.Logout()
  }
}
