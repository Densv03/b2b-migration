import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientHomeOffersCaouselSkeletonComponent } from "./client-home-offers-caousel-skeleton.component";

describe("ClientHomeOffersCaouselSkeletonComponent", () => {
	let component: ClientHomeOffersCaouselSkeletonComponent;
	let fixture: ComponentFixture<ClientHomeOffersCaouselSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientHomeOffersCaouselSkeletonComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientHomeOffersCaouselSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
