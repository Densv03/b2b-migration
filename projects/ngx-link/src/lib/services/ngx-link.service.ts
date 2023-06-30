import { Injectable } from "@angular/core";
import {BehaviorSubject, map, Observable, of} from "rxjs";
@Injectable({
	providedIn: "root",
})
export class B2bNgxLinkService {
  private sub: Observable<string> = of('');

	private _lang = new BehaviorSubject("en");

	get lang$(): Observable<string> {
		if (!this.sub) {
			this.sub = this._lang.asObservable().pipe(map((lang) => this.getLang(lang)));
		}

		return this.sub;
	}

	get lang(): string {
		return this.getLang(this._lang.getValue());
	}

	public setLanguage(lang: string): void {
		this._lang.next("en" || lang);
	}

	public getStaticLink(link: string): string {
		return `/${this.lang}${link}`;
	}

	public getLink(link: string): Observable<string> {
		return this.lang$.pipe(map((lang) => `/${lang}${link}`));
	}

	public getLang(lang: string): string {
		return lang === "en" ? "" : lang;
	}

	public getUrl(url: string): string {
		return url.slice(-1) === "/" ? url.substring(0, url.length - 1) : url;
	}
}
