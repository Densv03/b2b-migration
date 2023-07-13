import {Component, Inject} from "@angular/core";
import {DocumentPreviewModel} from "../../../../../core/models/document-preview.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: "b2b-client-offer-document",
	templateUrl: "./client-offer-document.component.html",
	styleUrls: ["./client-offer-document.component.scss"],
})
export class ClientOfferDocumentComponent {

	constructor(public matDialogRef: MatDialogRef<ClientOfferDocumentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {document: DocumentPreviewModel}) {}

}
