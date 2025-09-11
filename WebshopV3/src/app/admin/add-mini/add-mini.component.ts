import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Item} from "../../item-libary/item.model";
import {ItemService} from "../../service/item.service";

import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-mini',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './add-mini.component.html',
  styleUrl: './add-mini.component.css'
})
export class AddMiniComponent {
  message: string;

  constructor(private itemService: ItemService) {
  }

  onAddItem(f: NgForm) {
    const value = f.value
    const newItem = new Item(null, value.name, value.description, value.imgPath, value.price, value.quantity)
    this.itemService.addItem(newItem)
    console.log(this.message)
    f.reset()

  }



}
