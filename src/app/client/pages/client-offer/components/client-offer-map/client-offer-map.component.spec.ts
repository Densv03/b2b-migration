import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientOfferMapComponent } from "./client-offer-map.component";

describe("ClientOfferMapComponent", () => {
	let component: ClientOfferMapComponent;
	let fixture: ComponentFixture<ClientOfferMapComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientOfferMapComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientOfferMapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
