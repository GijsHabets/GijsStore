import {Injectable} from "@angular/core";
import {Item} from "../item-libary/item.model";
import {ShoppingCartService} from "./shoppingCart.service";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Mini} from "../shopping-list/mini.model";
import {environment} from "../../environments/environment.prod";

@Injectable({providedIn: 'root'})
export class ItemService{
  itemsChanged = new Subject<Item[]>()

  private items: Item[] = [];


  constructor(private sCService: ShoppingCartService, private http: HttpClient) {
  }



  addItem(item: Item){
    const headers = { 'Content-Type': 'application/json','Authorization': 'Bearer '+sessionStorage.getItem('JWT') };
    this.http.post<Item>(`${environment.apiBase}/minicon/mini`, item, {headers}).subscribe(responseData =>{
      console.log(responseData);

    })

  }

  updateItem(newItem: Item, index: number){
    const headers = { 'Content-Type': 'application/json','Authorization': 'Bearer '+sessionStorage.getItem('JWT') };
    const route = `${environment.apiBase}/minicon/minis/`+index.toString()
    this.http.put<Item>(route, newItem, {headers}).subscribe(responseData =>{
      console.log(responseData);

    }
    )

  }

  getItems(){
    this.http.get<Item[]>(`${environment.apiBase}/minicon/minis`).subscribe(
      (items: Item[]) => {
        this.items = items;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
    return this.items

  }
  getItem(id: number){
    return this.items[id]
  }

  addMiniToShoppingCart(mini: Mini){
    this.sCService.addMini(mini)
  }

  deleteItem(deleteItem: Item) {
    const headers = { 'Content-Type': 'application/json','Authorization': 'Bearer '+sessionStorage.getItem('JWT') };
    const route = `${environment.apiBase}/minicon/minis/`+deleteItem.id.toString()
    this.http.delete(route,{headers}).subscribe(responseData =>{
      console.log(responseData);

    })

  }

}
