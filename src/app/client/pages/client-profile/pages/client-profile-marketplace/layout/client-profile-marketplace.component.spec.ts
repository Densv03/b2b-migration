import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileMarketplaceComponent } from "./client-profile-marketplace.component";

describe("ClientProfileMarketplaceComponent", () => {
	let component: ClientProfileMarketplaceComponent;
	let fixture: ComponentFixture<ClientProfileMarketplaceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileMarketplaceComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileMarketplaceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
