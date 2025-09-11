import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Item} from "../../item-libary/item.model";
import {ItemService} from "../../service/item.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-update-mini',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './update-mini.component.html',
  styleUrl: './update-mini.component.css'
})
export class UpdateMiniComponent implements OnInit{
  items: Item[];
  @ViewChild('miniSelect') miniSelected: ElementRef
  description: string;
  imgPath: string;
  price: number;
  stock: number;
    message: string;



  constructor(private itemService: ItemService) {
  }

  async onUpdateItem(f: NgForm) {
    const value = f.value
    const oldItem = this.items.find(item => item.name === value.name);
    const newItem = new Item(oldItem.id, value.name, value.description, value.imgPath, value.price, value.stock)
    this.itemService.updateItem(newItem, oldItem.id)
    f.reset()
  }
  onChange(){
    let value = this.miniSelected.nativeElement.value
    let index = this.items.findIndex(item => item.name === value);
    this.description = this.items[index].description
    this.imgPath = this.items[index].imgPath
    this.price = this.items[index].price
    this.stock = this.items[index].quantity
  }
  ngOnInit(): void {

    this.items = this.itemService.getItems()

  }

}
