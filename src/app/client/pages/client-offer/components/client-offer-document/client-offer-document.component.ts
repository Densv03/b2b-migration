import { Component, OnInit } from "@angular/core";
// import { DialogRef } from "@ngneat/dialog";
import {DocumentPreviewModel} from "../../../../../core/models/document-preview.model";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
	selector: "b2b-client-offer-document",
	templateUrl: "./client-offer-document.component.html",
	styleUrls: ["./client-offer-document.component.scss"],
})
export class ClientOfferDocumentComponent implements OnInit {
	public document?: DocumentPreviewModel;

	constructor(public ref: DialogRef) {}

	ngOnInit(): void {
		this.document = this.ref.data;
	}
}
