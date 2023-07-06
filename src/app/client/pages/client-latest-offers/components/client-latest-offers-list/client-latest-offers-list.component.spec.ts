import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientLatestOffersListComponent } from "./client-latest-offers-list.component";

describe("ClientLatestOffersListComponent", () => {
	let component: ClientLatestOffersListComponent;
	let fixture: ComponentFixture<ClientLatestOffersListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientLatestOffersListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientLatestOffersListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
