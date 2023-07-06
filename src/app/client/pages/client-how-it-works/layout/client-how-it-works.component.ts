import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostListener,
	OnDestroy,
	TemplateRef,
	ViewChild,
} from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { TranslocoService } from "@ngneat/transloco";
import { AmplitudeService } from "apps/site/src/app/core/services/amplitude/amplitude.service";

@Component({
	selector: "b2b-client-how-it-works",
	templateUrl: "./client-how-it-works.component.html",
	styleUrls: ["./client-how-it-works.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientHowItWorksComponent implements OnDestroy {
	@ViewChild("howItWorks") howItWorks: ElementRef<any>;
	pageYOffset = 0;
	innerHeight = 0;
	constructor(
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly _translocoService: TranslocoService,
		private readonly _ampService: AmplitudeService
	) {}

	public get ruVideo() {
		return this._translocoService.getActiveLang() === "ru";
	}

	processVideoClick(event) {
		const percents = (event.currentTime * 100) / event.duration;

		const breakpoints = [0, 25, 50, 75, 100];

		const differenece = breakpoints.map((breakpoint) =>
			breakpoint > percents ? breakpoint - percents : percents - breakpoint
		);

		const minIndex = differenece.indexOf(Math.min(...differenece.reverse()));

		const percent = breakpoints[breakpoints.length - 1 - minIndex];
		this._ampService.logEvent("Clicked on how video", {
			type: percent.toString() + "%",
			source: localStorage.getItem("source"),
		});
	}
	ngOnDestroy() {
		const percentFilled = (this.pageYOffset * 100) / this.innerHeight;
		this._ampService.logEvent("View How it Works page", {
			type: percentFilled.toString() + "%",
			source: localStorage.getItem("source"),
		});
	}

	@HostListener("window:scroll", ["$event"])
	onScroll(event) {
		this.pageYOffset = window.pageYOffset;
		this.innerHeight = window.innerHeight;
	}
}
