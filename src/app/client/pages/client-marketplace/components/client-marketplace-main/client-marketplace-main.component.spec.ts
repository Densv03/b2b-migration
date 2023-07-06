import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceMainComponent } from "./client-marketplace-main.component";

describe("ClientMarketplaceMainComponent", () => {
	let component: ClientMarketplaceMainComponent;
	let fixture: ComponentFixture<ClientMarketplaceMainComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceMainComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceMainComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
