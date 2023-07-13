import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ImageItem } from "ng-gallery";
import { environment} from "../../../../../src/environments/environment";

@Component({
	selector: "b2b-ngx-images-carousel",
	templateUrl: "./ngx-images-carousel.component.html",
	styleUrls: ["./ngx-images-carousel.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxImagesCarouselComponent implements OnChanges {
	@Input() public options: any[];
	@Input() public className: string = '';
	public images: ImageItem[] = null;

	public get imagesCarouselClassName() {
		return `${this.className}`;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (!changes['options']) {
			return;
		}

		if (changes['options'].currentValue) {
			this.images = changes['options'].currentValue.map((option: any) => {
				return new ImageItem({
					src: environment.apiUrl + option.lg,
					thumb: environment.apiUrl + option.lg,
				});
			});
		}
	}
}
