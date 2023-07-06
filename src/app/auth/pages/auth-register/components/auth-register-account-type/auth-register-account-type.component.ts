import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	HostListener,
	Output
} from '@angular/core';
import {B2bNgxButtonThemeEnum} from "../../../../../../../../../libs/ngx-button/src";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
	selector: 'b2b-auth-register-account-type',
	templateUrl: './auth-register-account-type.component.html',
	styleUrls: ['./auth-register-account-type.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('buttonMove', [
			state('start', style({
				left: '1%',
				transform: 'translate(0, 0)'
			})),
			state('end', style({
				left: '99%',
				transform: 'translate(-100%, 0)'
			})),
			transition('start => end', animate('300ms linear')),
			transition('end => start', animate('300ms linear'))
		]),
	]
})
export class AuthRegisterAccountTypeComponent {
	@Output() public userType = new EventEmitter<'buyer' | 'supplier'>();

	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public selectedBlock: 'buyer' | 'supplier';
	public deviceIsMobile = window.innerWidth <= 768;

	constructor() {
		this.deviceIsMobile ? this.selectedBlock = 'supplier' : null;
	}


	@HostListener('window:resize', ['$event'])
	public selectBlockIfMobile(event) {
		event.target.innerWidth <= 768 && !this.selectedBlock ? this.selectedBlock = 'supplier' : null;
		this.deviceIsMobile = event.target.innerWidth <= 768;
	}

	public selectBlock(blockType: 'buyer' | 'supplier'): void {
		this.selectedBlock = blockType;
	}

	public sendUserType(): void {
		this.userType.emit(this.selectedBlock);
	}
}
