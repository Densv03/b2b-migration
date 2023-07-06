import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileTradebidChatsComponent } from "./client-profile-tradebid-chats.component";

describe("ClientProfileTradebidChatsComponent", () => {
	let component: ClientProfileTradebidChatsComponent;
	let fixture: ComponentFixture<ClientProfileTradebidChatsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileTradebidChatsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileTradebidChatsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
