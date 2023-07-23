import { Injectable } from '@angular/core';
import * as mixpanel from "mixpanel-browser";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class MixpanelService {
	private token: string | null = '7a0cfcbc67cff070e51719b1e725ded8'
	;

	constructor() {
		if (!environment.apiUrl.includes('-dev')) {
			mixpanel.init(this.token, {debug: true});
		}
	}

	public track(event: string, props?: unknown): void {
		if (this.token) {
				mixpanel.track(event, props);
		}
	}

	public logIn(user: any, track: string): void {
		if (this.token) {
			if (mixpanel.get_distinct_id()) {
				mixpanel.identify(user['User_id']);
				mixpanel.people.set({...user, time: new Date().toISOString(), deviceType: this.detectDeviceType()});
				this.track(track);
			} else {
				this.signUp(user, track);
			}
		}
	}

	public signUp(user: any, track: string): void {
		if (this.token) {
			mixpanel.alias(user['User_id']);
			mixpanel.people.set({distinct_id: user['User_id'], ...user, time: new Date().toISOString(), deviceType: this.detectDeviceType()});
			this.track(track);
		}
	}

	public logout(): void {
		this.track('Log Out');
		mixpanel.reset();
	}

	private detectDeviceType(): string {
		const userAgent = window.navigator.userAgent;
		if (/mobile/i.test(userAgent)) {
			return 'Mobile';
		} else if (/tablet/i.test(userAgent)) {
			return 'Tablet';
		} else {
			return 'Desktop';
		}
	}
}
