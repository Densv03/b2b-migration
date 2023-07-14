import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientProfileUnclaimedCargoComponent } from "./layout/client-profile-unclaimed-cargo.component";
import { MatTabsModule } from "@angular/material/tabs";
import { ClientPforfileUnclaimedCargoRoutingModule } from "./client-pforfile-unclaimed-cargo-routing.module";
import { ClientProfileMyOffersModule } from "../client-profile-my-offers/client-profile-my-offers.module";
import { ClientProfileSavedOffersModule } from "../client-profile-saved-offers/client-profile-saved-offers.module";
import {ClientProfileMyChatsModule} from "../client-profile-my-chats/client-profile-my-chats.module";

@NgModule({
	declarations: [ClientProfileUnclaimedCargoComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    ClientPforfileUnclaimedCargoRoutingModule,
    ClientProfileMyOffersModule,
    ClientProfileSavedOffersModule,
    ClientProfileMyChatsModule,
  ],
})
export class ClientProfileUnclaimedCargoModule {}
