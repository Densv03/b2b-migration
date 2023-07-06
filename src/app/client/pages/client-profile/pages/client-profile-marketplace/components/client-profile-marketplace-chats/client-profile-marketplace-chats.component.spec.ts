import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileMarketplaceChatsComponent } from "./client-profile-marketplace-chats.component";

describe("ClientProfileMarketplaceChatsComponent", () => {
	let component: ClientProfileMarketplaceChatsComponent;
	let fixture: ComponentFixture<ClientProfileMarketplaceChatsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileMarketplaceChatsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileMarketplaceChatsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
