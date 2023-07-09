import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientTradebidListingComponent } from "./client-tradebid-listing.component";

describe("ClientTradebidListingComponent", () => {
	let component: ClientTradebidListingComponent;
	let fixture: ComponentFixture<ClientTradebidListingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientTradebidListingComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientTradebidListingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
