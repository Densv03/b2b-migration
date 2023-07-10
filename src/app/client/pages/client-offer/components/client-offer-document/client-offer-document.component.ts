import {Component, Inject, OnInit} from "@angular/core";
import {DocumentPreviewModel} from "../../../../../core/models/document-preview.model";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
	selector: "b2b-client-offer-document",
	templateUrl: "./client-offer-document.component.html",
	styleUrls: ["./client-offer-document.component.scss"],
})
export class ClientOfferDocumentComponent {

	constructor(public ref: DialogRef,
              @Inject(DIALOG_DATA) public data: {document: DocumentPreviewModel}) {}

}
