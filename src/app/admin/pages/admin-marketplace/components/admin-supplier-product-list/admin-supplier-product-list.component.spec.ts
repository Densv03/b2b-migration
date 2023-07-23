import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminSupplierProductListComponent } from "./admin-supplier-product-list.component";

describe("ProductListComponent", () => {
	let component: AdminSupplierProductListComponent;
	let fixture: ComponentFixture<AdminSupplierProductListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AdminSupplierProductListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminSupplierProductListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
