import { Routes } from '@angular/router';
import {CustomerMoveComponent} from "./components/customer-move/customer-move.component";
import {inject} from "@angular/core";
import {AuthService} from "./services/auth.service";
import {TestComponent} from "./components/test-component/test.component";

export const routes: Routes = [
  {
    path: '',
    component: CustomerMoveComponent,
    canActivate: [() => inject(AuthService).isAuthorized],
    canDeactivate: [(c: CustomerMoveComponent) => !c.getActiveCustomers()]
  },
  {
    path: 'test',
    component: TestComponent
  }
];
