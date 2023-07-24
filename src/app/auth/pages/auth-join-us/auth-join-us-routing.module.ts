import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthJoinUsComponent } from './layout/auth-join-us.component';

const routes: Routes = [
  {
    path: '',
    component: AuthJoinUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthJoinUsRoutingModule {}
