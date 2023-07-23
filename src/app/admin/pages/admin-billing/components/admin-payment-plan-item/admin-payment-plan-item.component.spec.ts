import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminPaymentPlanItemComponent } from "./admin-payment-plan-item.component";

describe("AdminPaymentPlanItemComponent", () => {
	let component: AdminPaymentPlanItemComponent;
	let fixture: ComponentFixture<AdminPaymentPlanItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AdminPaymentPlanItemComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminPaymentPlanItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
