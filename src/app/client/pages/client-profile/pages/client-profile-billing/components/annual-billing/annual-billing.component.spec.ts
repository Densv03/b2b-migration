import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AnnualBillingComponent } from "./annual-billing.component";

describe("AnnualBillingComponent", () => {
	let component: AnnualBillingComponent;
	let fixture: ComponentFixture<AnnualBillingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AnnualBillingComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AnnualBillingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
