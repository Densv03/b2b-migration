import {Component, Inject, OnInit} from "@angular/core";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {B2bNgxImagesCarouselModule} from "@b2b/ngx-images-carousel";

@Component({
	selector: "b2b-client-offer-images",
	templateUrl: "./client-offer-images.component.html",
	styleUrls: ["./client-offer-images.component.scss"],
  standalone: true,
  imports: [B2bNgxImagesCarouselModule]
})
export class ClientOfferImagesComponent implements OnInit {
	public images: any[];
	constructor(@Inject(DIALOG_DATA) public data: any) {}

	ngOnInit(): void {
		this.images = this.data.photos;
	}
}
