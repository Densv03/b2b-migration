import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-profile-my-offers-list",
	templateUrl: "./client-profile-my-offers-list.component.html",
	styleUrls: ["./client-profile-my-offers-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfileMyOffersListComponent implements OnInit, OnChanges {
	@Input() public readonly options: any[];
	@Input() public readonly link: string;
	@Input() public readonly menuOptions: any;

	public parsedOptions: any[];
	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}

	ngOnChanges(): void {
		this.computeOptions();
	}

	ngOnInit(): void {
		this.computeOptions();
	}

	computeOptions() {
		this.parsedOptions = this.options.map((option) => {
			const updatedOptions = [
				...this.menuOptions.filter((el) => (option.hidden ? el.label !== "Hide" : el.label !== "Unhide")),
			];
			return {
				...option,
				updatedOptions,
			};
		});
	}
}
