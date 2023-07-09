import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileMarketplaceArchiveComponent } from "./client-profile-marketplace-archive.component";

describe("ClientProfileMarketplaceArchiveComponent", () => {
	let component: ClientProfileMarketplaceArchiveComponent;
	let fixture: ComponentFixture<ClientProfileMarketplaceArchiveComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileMarketplaceArchiveComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileMarketplaceArchiveComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
