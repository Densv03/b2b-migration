import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileOfferChatComponent } from "apps/site/src/app/client/pages/client-profile-offer-chat/layout/client-profile-offer-chat.component";

describe("ClientProfileChatComponent", () => {
	let component: ClientProfileOfferChatComponent;
	let fixture: ComponentFixture<ClientProfileOfferChatComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileOfferChatComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileOfferChatComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
