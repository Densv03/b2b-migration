import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientProfileYourWorkspaceRoutingModule } from "./client-profile-your-workspace-routing.module";
import { ClientProfileYourWorkspaceComponent } from "./layout/client-profile-your-workspace.component";

@NgModule({
	declarations: [ClientProfileYourWorkspaceComponent],
	imports: [CommonModule, ClientProfileYourWorkspaceRoutingModule],
})
export class ClientProfileYourWorkspaceModule {}
