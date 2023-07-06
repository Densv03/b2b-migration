import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ClientAboutUsComponent } from "./layout/client-about-us.component";
import { B2bNgxButtonModule } from "@b2b/ngx-button";

const routes: Routes = [
	{
		path: "",
		component: ClientAboutUsComponent,
	},
];

@NgModule({
	declarations: [ClientAboutUsComponent],
	imports: [CommonModule, RouterModule.forChild(routes), B2bNgxImageModule, B2bNgxIconModule, B2bNgxButtonModule],
})
export class ClientAboutUsModule {}
