import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminArticleCategoriesComponent } from "./admin-article-categories.component";

describe("AdminOfferComponent", () => {
	let component: AdminArticleCategoriesComponent;
	let fixture: ComponentFixture<AdminArticleCategoriesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AdminArticleCategoriesComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminArticleCategoriesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
