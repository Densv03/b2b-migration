import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductDescriptionItemComponent } from "./product-description-item.component";

describe("ManageItemComponent", () => {
	let component: ProductDescriptionItemComponent;
	let fixture: ComponentFixture<ProductDescriptionItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProductDescriptionItemComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductDescriptionItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
