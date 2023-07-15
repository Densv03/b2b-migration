import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { fromEvent } from "rxjs";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, skip } from "rxjs/operators";
import { dropdownLabels } from "../dropdown-labels.enum";

@UntilDestroy()
@Component({
	selector: "b2b-ngx-dropdown",
	templateUrl: "./ngx-dropdown.component.html",
	styleUrls: ["./ngx-dropdown.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxDropdownComponent {
	@Input() options: any[];
	@Input() requiredOptionToCheck: Array<any>;
	@Input() className: string;
	@Input() optionToReturn: any;
	@Output() toggleOptionClick: EventEmitter<{}>;
	public isMenuShow: boolean;

	constructor(private readonly changeDetection: ChangeDetectorRef) {
		this.isMenuShow = false;
		this.toggleOptionClick = new EventEmitter<{}>();
	}

	public callOptionFunc(event: MouseEvent, option: { onClick: (arg0: any, arg1: any[]) => void; }) {
		this.isMenuShow = false;

		event.preventDefault();
		event.stopImmediatePropagation();

		option.onClick(this.optionToReturn || option, this.requiredOptionToCheck);
	}

	public get menuClassName() {
		const defaultStyles = ``;

		return `${this.className} ${defaultStyles}`;
	}

	public subscribeOnClickOutside(container: { contains: (arg0: EventTarget) => any; }) {
		const subscription = fromEvent(document, "click")
			.pipe(
				skip(1),
				untilDestroyed(this),
				filter((clicked) => !container.contains(clicked.target))
			)
			.subscribe(() => {
				this.isMenuShow = false;
				this.changeDetection.detectChanges();
				subscription.unsubscribe();
			});
	}

	public showMenu(event: MouseEvent, container: any) {
		this.isMenuShow = !this.isMenuShow;

		event.stopImmediatePropagation();
		event.preventDefault();

		if (this.isMenuShow) {
			this.subscribeOnClickOutside(container);
		}

		return;
	}
}
