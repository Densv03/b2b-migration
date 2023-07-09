import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileAddOfferDialogComponent } from "./client-profile-add-offer-dialog.component";

describe("ClientProfileAddOfferDialogComponent", () => {
	let component: ClientProfileAddOfferDialogComponent;
	let fixture: ComponentFixture<ClientProfileAddOfferDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileAddOfferDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileAddOfferDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
