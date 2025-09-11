import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  admin: boolean = false;
  user: boolean = false;

  constructor(private authService: AuthService) {
  }

  checkKeys(){
    if(this.authService.getAdminKey()){

      this.admin = true
    }

    if(this.authService.getkey()){
      this.user = true
    }
  }

  ngOnInit(): void {



  }




}
