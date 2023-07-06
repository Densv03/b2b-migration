import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileOfferComponent } from "apps/site/src/app/client/pages/client-profile-offer/layout/client-profile-offer.component";

describe("ClientProfileOfferComponent", () => {
	let component: ClientProfileOfferComponent;
	let fixture: ComponentFixture<ClientProfileOfferComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileOfferComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileOfferComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
