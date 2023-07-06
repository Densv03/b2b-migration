import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ClientProfileUnclaimedCargoComponent } from "./layout/client-profile-unclaimed-cargo.component";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileUnclaimedCargoComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientPforfileUnclaimedCargoRoutingModule {}
