import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import * as amplitude from 'amplitude-js'
import {isPlatformBrowser} from "@angular/common";

@Injectable({
	providedIn: "root",
})
export class AmplitudeService {
	constructor(@Inject(PLATFORM_ID) private readonly _platformId: string) {
		if (!isPlatformBrowser(this._platformId)) {
			return;
		}

		amplitude
			.getInstance()
			.init("316e23aca5f831a3685f2f5c4b1ca972", null, { includeReferrer: true, includeUtm: true, includeGclid: true });
	}

	logEvent(eventType: string, properties?: { source: string; }) {
		if (!isPlatformBrowser(this._platformId)) {
			return;
		}

		amplitude.getInstance().logEvent(eventType, properties);
	}
}
