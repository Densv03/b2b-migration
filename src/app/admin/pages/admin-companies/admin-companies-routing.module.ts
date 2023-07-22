import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminCompaniesComponent} from "./layout/admin-companies.component";

const routes: Routes = [
	{
		path: '',
		component: AdminCompaniesComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCompaniesRoutingModule { }
