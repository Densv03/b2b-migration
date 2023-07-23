import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit} from "@angular/core";
import {UserService} from "../../../../../client/pages/client-profile/services/user/user.service";
import { take } from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: "b2b-admin-offer-chats-dialog",
	templateUrl: "./admin-offer-chats-dialog.component.html",
	styleUrls: ["./admin-offer-chats-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOfferChatsDialogComponent {
	users: any[] = [];

	constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<AdminOfferChatsDialogComponent>,
		private readonly _usersService: UserService,
		private readonly _cdr: ChangeDetectorRef
	) {
		const refData = this.data;
		if (refData.chatUsers && refData.chatUsers.length) {
			refData.chatUsers.forEach((id: any) => {
				this._usersService
					.getUserById(id)
					.pipe(take(1))
					.subscribe((user: any) => {
						this.users.push(user);
						this._cdr.detectChanges();
					});
			});
		}
	}
}
