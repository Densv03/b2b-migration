import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {User} from "../../../../../src/app/core/models/user/user.model";
import {UserService} from "../../../../../src/app/client/pages/client-profile/services/user/user.service";
import {environment} from "../../../../../src/environments/environment";


@Component({
	selector: "b2b-ngx-chats-list",
	templateUrl: "./ngx-chats-list.component.html",
	styleUrls: ["./ngx-chats-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxChatsListComponent {
	@Input() public options: any[];
	@Input() public link: string;
	@Input() public dropdownOptions: any[];
	@Input() public buyerOptions: any[];
	@Input() public sellerOptions: any[];
	@Input() public baseUrl: string;

	private user: User;

	constructor(private readonly userService: UserService) {
		this.user = this.userService.getUser();
	}

	public getImgSrc(option: any): string {
		return Array.isArray(option.offer.photos) && option?.offer?.photos[0]?.sm
			? `${environment.apiUrl}${option.offer?.photos[0]?.sm}`
			: "";
	}
	public getFullName(chat: any): string {
		if (this.user._id === chat.buyer._id) {
			return chat.seller?.fullName;
		}
		return chat.buyer?.fullName;
	}
}
