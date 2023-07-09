import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileMyChatsComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-my-chats/layout/client-profile-my-chats.component";

describe("ClientProfileChatsComponent", () => {
	let component: ClientProfileMyChatsComponent;
	let fixture: ComponentFixture<ClientProfileMyChatsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileMyChatsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileMyChatsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
