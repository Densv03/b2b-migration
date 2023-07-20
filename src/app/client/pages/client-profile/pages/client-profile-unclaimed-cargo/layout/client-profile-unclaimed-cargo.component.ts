import { Component } from "@angular/core";
import {UserService} from "../../../services/user/user.service";

@Component({
	selector: "b2b-client-profile-unclaimed-cargo",
	templateUrl: "./client-profile-unclaimed-cargo.component.html",
	styleUrls: ["./client-profile-unclaimed-cargo.component.scss"],
})
export class ClientProfileUnclaimedCargoComponent {
	public isBuyerAccount = this.userService.getUser().rootRole?.displayName === 'Buyer';
	constructor(private userService: UserService) {}

}
