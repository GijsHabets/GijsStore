import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../item.model";
import {ItemService} from "../../../service/item.service";
import {Mini} from "../../../shopping-list/mini.model";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit{

  @Input() item: Item;
  @Input() index: number;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {

  }


  addMiniToShoppingCart(name: string, price: number) {
    this.itemService.addMiniToShoppingCart(new Mini(name, 1,price))
  }
}
