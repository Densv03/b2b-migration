import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileMyOfferMarkAsSoldComponent } from "./client-profile-my-offer-mark-as-sold.component";

describe("ClientProfileMyOfferMarkAsSoldComponent", () => {
	let component: ClientProfileMyOfferMarkAsSoldComponent;
	let fixture: ComponentFixture<ClientProfileMyOfferMarkAsSoldComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileMyOfferMarkAsSoldComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileMyOfferMarkAsSoldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
