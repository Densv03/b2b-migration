import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileOfferChatsComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-offer-chats/layout/client-profile-offer-chats.component";

describe("ClientProfileChatsComponent", () => {
	let component: ClientProfileOfferChatsComponent;
	let fixture: ComponentFixture<ClientProfileOfferChatsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileOfferChatsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileOfferChatsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
