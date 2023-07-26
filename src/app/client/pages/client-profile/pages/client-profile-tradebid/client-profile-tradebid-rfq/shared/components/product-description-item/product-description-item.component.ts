import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RfqButtonTypeEnum } from "../../enums/RfqButtonType.enum";

@Component({
	selector: "b2b-product-description-item",
	templateUrl: "./product-description-item.component.html",
	styleUrls: ["./product-description-item.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDescriptionItemComponent implements OnInit {
	public rfqButtonEnum = RfqButtonTypeEnum;

	@Input() myRfqItem: any;
	@Input() buttonType: RfqButtonTypeEnum;
	@Output() itemId: EventEmitter<string> = new EventEmitter<string>();

	@Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() archivate: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() restore: EventEmitter<any> = new EventEmitter<any>();
	constructor() {}

	get imageName(): string {
		if (!this.myRfqItem?.photos) {
			return "tradebid-default";
		}
		return this.myRfqItem?.photos[0] ? this.myRfqItem.photos[0].lg : "tradebid-default";
	}

	get productName(): string {
		return this.myRfqItem.productName;
	}

	get quantity(): string {
		return this.myRfqItem.quantity;
	}

	get recievedOffers(): any {
		return this.myRfqItem?.chatStarted?.length ?? 0;
	}

	public ngOnInit(): void {}

	public onEdit(): void {
		this.edit.emit(this.myRfqItem._id);
	}

	public onArchivate(): void {
		this.archivate.emit(this.myRfqItem);
	}

	public onDelete(): void {
		this.delete.emit(this.myRfqItem);
	}

	public onRestore(): void {
		this.restore.emit(this.myRfqItem);
	}
}
