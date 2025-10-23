import {EventEmitter} from "@angular/core";
import {Mini} from "../shopping-list/mini.model";

export class ShoppingCartService{
  miniChange = new EventEmitter<Mini[]>()

  private minis: Mini[]=[]
  private total: number = 0;

  getTotal(){

    return this.total;
  }
  getMinis(){
    return this.minis.slice()
  }
  addMini(mini: Mini){
    for(let exMini of this.minis){
      if(exMini.name === mini.name){
        exMini.amount++
        break

      }

    }
    if(!this.minis.some(exMini => exMini.name === mini.name)){
      this.minis.push(mini)
    }
    this.total = this.total + mini.price
    this.miniChange.emit(this.minis.slice())
  }
  removeMini(mini: Mini) {
    const idx = this.minis.findIndex(m => m.name === mini.name);
    if (idx === -1) {
      return;
    }

    const exMini = this.minis[idx];

    if ((exMini.amount ?? 1) > 1) {
      exMini.amount--;
    } else {
      this.minis.splice(idx, 1);
    }

    this.total = Math.max(0, this.total - mini.price);
    this.miniChange.emit(this.minis.slice());
  }



  addMinis(mini: Mini[]){
    this.minis.push(...mini)
    this.miniChange.emit(this.minis.slice())
  }
}
