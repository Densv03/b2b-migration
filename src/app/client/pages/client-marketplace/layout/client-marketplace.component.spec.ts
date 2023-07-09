import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceComponent } from "./client-marketplace.component";

describe("ClientMarketplaceComponent", () => {
	let component: ClientMarketplaceComponent;
	let fixture: ComponentFixture<ClientMarketplaceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
