import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientLatestOffersComponent } from "apps/site/src/app/client/pages/client-latest-offers/layout/client-latest-offers.component";

describe("ClientLatestOffersComponent", () => {
	let component: ClientLatestOffersComponent;
	let fixture: ComponentFixture<ClientLatestOffersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientLatestOffersComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientLatestOffersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
