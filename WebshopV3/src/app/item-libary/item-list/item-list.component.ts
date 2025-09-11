import { Component } from '@angular/core';
import {ItemComponent} from "./item/item.component";
import {Item} from "../item.model";
import {ItemService} from "../../service/item.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    ItemComponent,
    NgForOf
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  items: Item[] = []

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.items = this.itemService.getItems()

  }

}
