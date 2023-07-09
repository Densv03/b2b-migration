import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileMyOffersComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-my-offers/layout/client-profile-my-offers.component";

describe("ClientProfileOffersComponent", () => {
	let component: ClientProfileMyOffersComponent;
	let fixture: ComponentFixture<ClientProfileMyOffersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileMyOffersComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileMyOffersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
