import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientLatestOffersGridComponent } from "./client-latest-offers-grid.component";

describe("ClientLatestOffersGridComponent", () => {
	let component: ClientLatestOffersGridComponent;
	let fixture: ComponentFixture<ClientLatestOffersGridComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientLatestOffersGridComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientLatestOffersGridComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
