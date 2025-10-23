import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormsModule, NgForm} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "./user.model";
import {RoleService} from "../../service/role.service";

@Component({
  selector: 'app-update-role',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './update-role.component.html',
  styleUrl: './update-role.component.css'
})
export class UpdateRoleComponent implements OnInit{
  users: User[];
  usersWithoutAdmin: User[];
  usersWithAdmin: User[];
  @ViewChild('userSelect') userSelected: ElementRef
  @ViewChild('userSelect2') userSelected2: ElementRef
  selectedToRemove: User | null;

  constructor( private roleService: RoleService) {
  }


  async onUpdateRole(f: NgForm) {
    const value = f.value
    console.log("test1")
    const user = this.users.find(user => user.username === value.addUser);
    this.roleService.updateRoles(user.id)
    f.reset()
  }
  async onRemoveRole(f2: NgForm) {
    console.log("test")
    const value = f2.value
    const user = this.users.find(user => user.username === value.removeUser);
    if (!user) {
      return;
    }
    this.roleService.removeRoles(user.id)
    f2.reset()
  }

  ngOnInit() {
    this.users = this.roleService.getUsers()
    const isAdmin = (u: User) => u.roles?.some(r => r.name === 'ROLE_ADMIN');
    this.usersWithAdmin = this.users.filter(isAdmin);
    this.usersWithoutAdmin = this.users.filter(u => !isAdmin(u));
  }
  onChange(){
    let value = this.userSelected.nativeElement.value
    let value2 = this.userSelected2.nativeElement.value
  }


}
