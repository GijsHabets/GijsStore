import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ItemService} from "../../service/item.service";
import {Item} from "../../item-libary/item.model";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-remove-mini',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './remove-mini.component.html',
  styleUrl: './remove-mini.component.css'
})
export class RemoveMiniComponent implements OnInit{
  items: Item[]
  constructor(private itemService: ItemService) {
  }
  ngOnInit(): void {

    this.items = this.itemService.getItems()

  }

  onDeleteItem(f: NgForm) {
    const value = f.value
    console.log(value.name)
    let index = this.items.findIndex(item => item.name === value.name);
    console.log(this.items[index])
    this.itemService.deleteItem(this.items[index])
    f.reset()

  }

}
