import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "../../../../../client-profile/services/user/user.service";

@Component({
  selector: 'b2b-client-market-company-page-phone-dialog',
  templateUrl: './client-market-company-page-phone-dialog.component.html',
  styleUrls: ['./client-market-company-page-phone-dialog.component.scss']
})
export class ClientMarketCompanyPagePhoneDialogComponent {
	private isPhoneVisibleSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.data.isPhoneVisible);

	public get isPhoneVisible$(): Observable<boolean> {
		return this.isPhoneVisibleSource.asObservable();
	}

  constructor(@Inject(MAT_DIALOG_DATA)
							public data: {phoneNumber: string, dialCode: string, isPhoneVisible?: boolean, user: string},
							private userService: UserService,
							private dialogRef: MatDialogRef<ClientMarketCompanyPagePhoneDialogComponent>) { }

	public toggleIsPhoneVisible(): void {
		this.isPhoneVisibleSource.next(true);
	}

	public closeModal(): void {
		this.dialogRef.close(this.isPhoneVisibleSource.getValue());
	}

	public getPhone(): string {
		return this.data.dialCode ? this.data.dialCode + this.data.phoneNumber : this.data.phoneNumber;
	}
}
