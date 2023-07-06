import { Injectable } from "@angular/core";
import { TranslocoService } from "@ngneat/transloco";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class I18nService {
	public readonly formControl;

	constructor(private readonly _translocoService: TranslocoService) {}

	setActiveLang(lang: string) {
		this._translocoService.setActiveLang("en" || lang);
	}
}
