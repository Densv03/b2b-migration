import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientHomeOffersCaouselComponent } from "./client-home-offers-caousel.component";

describe("ClientHomeOffersCaouselComponent", () => {
	let component: ClientHomeOffersCaouselComponent;
	let fixture: ComponentFixture<ClientHomeOffersCaouselComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientHomeOffersCaouselComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientHomeOffersCaouselComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
