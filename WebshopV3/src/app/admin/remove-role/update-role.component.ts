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

  constructor( private roleService: RoleService) {
  }


  async onUpdateRole(f: NgForm) {
    const value = f.value
    const user = this.users.find(user => user.username === value.username);
    this.roleService.updateRoles(user.id)
    f.reset()
  }
  async onRemoveRole(f: NgForm) {
    const value = f.value
    const user = this.users.find(user => user.username === value.username);
    this.roleService.removeRoles(user.id)
    f.reset()
  }

  ngOnInit() {
    this.users = this.roleService.getUsers()
    this.usersWithoutAdmin = this.users.filter(user => !user.roles.includes('ROLE_ADMIN'));
    this.usersWithAdmin = this.users.filter(user => user.roles.includes('ROLE_ADMIN'));

  }
  onChange(){
    let value = this.userSelected.nativeElement.value
  }


}
