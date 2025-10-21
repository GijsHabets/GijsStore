import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {User} from "../admin/remove-role/user.model";

@Injectable({providedIn: 'root'})
export class RoleService{
  private roles: string[] = ['ROLE_USER', 'ROLE_ADMIN'];
  private users: User[] = [];

  constructor(private http: HttpClient) {
  }

  updateRoles(index: number): void {
    const headers = { 'Content-Type': 'application/json','Authorization': 'Bearer '+sessionStorage.getItem('JWT') };
    const route = `${environment.apiBase}/updateRole/ROLE_ADMIN/`+index.toString()
    this.http.put(route, {headers}).subscribe(responseData =>{
      console.log(responseData);
    });


  }

  removeRoles(index: number): void {
    const headers = { 'Content-Type': 'application/json','Authorization': 'Bearer '+sessionStorage.getItem('JWT') };
    const route = `${environment.apiBase}/removeRole/`+index.toString()
    this.http.delete(route,{headers}).subscribe(responseData =>{
      console.log(responseData);
    })
  }

  getUsers(){
    const headers = { 'Content-Type': 'application/json','Authorization': 'Bearer '+sessionStorage.getItem('JWT') };
    const route = `${environment.apiBase}/getAllUsers/`
    this.http.get<User[]>(route,{headers}).subscribe((users: User[]) => {
      this.users = users;
    }, (error) => {
      console.error('Error fetching users:', error);
    })
    return this.users;
  }

}
