import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, tap} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class SeoService {
	private renderer2: Renderer2;

	constructor(private rendererFactory: RendererFactory2,
							@Inject(DOCUMENT) private doc: Document,
							private router: Router,
							private route: ActivatedRoute) {
		this.renderer2 = this.rendererFactory.createRenderer(null, null);
	}

	public addBlogMicroMarkup(document: Document, urlAddress: string, blogName: string, datePublished: Date | string, dateModified: Date | string): void {
		const script = this.renderer2.createElement('script');
		script.type = `application/ld+json`;
		script.id = "micro-markup";

		script.text = `
            {
							"@context": "https://schema.org",
							"@type": "NewsArticle",
							"mainEntityOfPage": {
								"@type": "WebPage",
								"@id": ${urlAddress}
							},
							"headline": ${blogName},
							"datePublished": ${this.getDateForBlogMarkup(datePublished)},
							"dateModified": ${this.getDateForBlogMarkup(dateModified)}
							}
        `;

		this.renderer2.appendChild(document.body, script);
	}

	public addCanonicalRef(): void {
		this.initCanonicalRef();
		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			tap(() => {
				this.removeCanonicalRefs();
				this.initCanonicalRef();
			})
		).subscribe();
	}

	private initCanonicalRef(): void {
		let link: HTMLLinkElement = this.doc.createElement('link');
		const index = this.doc.URL.indexOf('?');
		const url = index !== -1 ? this.doc.URL.substring(0, index) : this.doc.URL;
		link.setAttribute('rel', 'canonical');
		this.doc.head.appendChild(link);
		link.setAttribute('href', url);
	}

	private removeCanonicalRefs(): void {
		const head = document.getElementsByTagName('head')[0];
		const links = head.getElementsByTagName('link');
		for (let i = 0; i < links.length; i++) {
			const link = links[i];
			if (link.rel === 'canonical') {
				this.renderer2.removeChild(head, link);
			}
		}
	}

	private getDateForBlogMarkup(date: Date | string): string {
		if (typeof date === 'string') {
			date = new Date()
		}

		const isoString = date.toISOString(); // returns "2015-02-05T00:00:00.000Z"
		const dateString = isoString.slice(0, 10); // extract "YYYY-MM-DD" from isoString
		const timeString = isoString.slice(11, 19); // extract "HH:mm:ss" from isoString
		const offsetString = "+08:00"; // specify the desired time zone offset
		const formattedString = dateString + 'T' + timeString + offsetString; // concatenate the components
		return formattedString;
	}
}
