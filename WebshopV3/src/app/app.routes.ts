import { Routes } from '@angular/router';
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {ItemLibaryComponent} from "./item-libary/item-libary.component";
import {AuthComponent} from "./auth/auth.component";
import {RemoveMiniComponent} from "./admin/remove-mini/remove-mini.component";
import {UpdateMiniComponent} from "./admin/update-mini/update-mini.component";
import {AddMiniComponent} from "./admin/add-mini/add-mini.component";
import {AdminComponent} from "./admin/admin.component";
import {KlantComponent} from "./klant/klant.component";

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'admin', component: AdminComponent, children: [
      {path: 'new', component: AddMiniComponent, outlet: 'miniCUD'},
      {path: 'update', component: UpdateMiniComponent, outlet: "miniCUD"},
      {path: 'delete', component: RemoveMiniComponent, outlet: "miniCUD"}
    ]},
  {path: 'item-catalog', component: ItemLibaryComponent},
  {path: 'klant', component: KlantComponent},
  {path: 'auth', component: AuthComponent}
];
