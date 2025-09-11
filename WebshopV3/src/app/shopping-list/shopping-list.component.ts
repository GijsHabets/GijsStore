import {Component, Input, OnInit} from '@angular/core';
import {Mini} from "./mini.model";
import {ShoppingCartService} from "../service/shoppingCart.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit{

  minis: Mini[]

  constructor(public sCService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.minis = this.sCService.getMinis()
    this.sCService.miniChange.subscribe(
      (minis: Mini[]) => {
        this.minis = minis
      }
    )
  }
}
