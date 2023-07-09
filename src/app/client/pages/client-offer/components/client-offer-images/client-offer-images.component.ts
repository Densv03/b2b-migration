import { Component, OnInit } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";

@Component({
	selector: "b2b-client-offer-images",
	templateUrl: "./client-offer-images.component.html",
	styleUrls: ["./client-offer-images.component.scss"],
})
export class ClientOfferImagesComponent implements OnInit {
	public images: any[];
	constructor(public ref: DialogRef) {}

	ngOnInit(): void {
		this.images = this.ref.data.photos;
	}
}
