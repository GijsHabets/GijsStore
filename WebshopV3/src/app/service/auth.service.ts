import {Injectable} from "@angular/core";
import {Item} from "../item-libary/item.model";
import {ShoppingCartService} from "./shoppingCart.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { environment } from "../../environments/environment.prod";


@Injectable({providedIn: 'root'})
export class AuthService{
  private adminKey: boolean = false;
  constructor(private http: HttpClient, private router: Router) {
  }
  auth(){
    const headers = { 'Authorization': 'Bearer '+sessionStorage.getItem('JWT') };

    const url = `${environment.apiBase}/test/user`
    // @ts-ignore
    this.http.get<string>(url, {headers, responseType: 'text'}).subscribe((response) =>{
      if(String(response) == "User Content."){
        this.setkey(true)
      }
      else{
        sessionStorage.setItem('key',String(false));
        this.setkey(false)
      }
    })

  }
  getAdminKey(): boolean{
    this.adminAuth()
    return this.adminKey;
  }

  setAdminKey(value: boolean){
    this.adminKey = value;
  }
  private key: boolean = false;
  getkey(): boolean {
    this.auth()
    return this.key;
  }

  setkey(value: boolean) {
    this.key = value;
  }
  adminAuth(){
    const headers = { 'Authorization': 'Bearer '+sessionStorage.getItem('JWT') };
    const url = `${environment.apiBase}/test/admin`
    // @ts-ignore
    this.http.get<string>(url, {headers, responseType: 'text'}).subscribe((response) =>{
      if(String(response) == "Admin Board."){
        sessionStorage.setItem("adminKey",String(true));
        this.setAdminKey(true)
      }
      else{
        sessionStorage.setItem("adminKey",String(false));
        this.setAdminKey(false)
      }
    })
  }

  Logout(){
    sessionStorage.removeItem('JWT');
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('adminKey');
    this.router.navigate(['']);
  }
}
