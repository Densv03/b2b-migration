import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileMyOfferDeleteComponent } from "./client-profile-my-offer-delete.component";

describe("ClientProfileMyOfferDeleteComponent", () => {
	let component: ClientProfileMyOfferDeleteComponent;
	let fixture: ComponentFixture<ClientProfileMyOfferDeleteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileMyOfferDeleteComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileMyOfferDeleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
