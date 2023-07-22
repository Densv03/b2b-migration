import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminOfferCategoriesComponent } from "./admin-offer-categories.component";

describe("AdminOfferComponent", () => {
	let component: AdminOfferCategoriesComponent;
	let fixture: ComponentFixture<AdminOfferCategoriesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AdminOfferCategoriesComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminOfferCategoriesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
