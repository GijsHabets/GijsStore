import { Component } from '@angular/core';
import {ItemListComponent} from "./item-list/item-list.component";

@Component({
  selector: 'app-item-libary',
  standalone: true,
  imports: [
    ItemListComponent
  ],
  templateUrl: './item-libary.component.html',
  styleUrl: './item-libary.component.css'
})
export class ItemLibaryComponent {

}
