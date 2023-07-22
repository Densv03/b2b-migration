import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminPaymentPlanListComponent } from "./admin-payment-plan-list.component";

describe("AdminPaymentPlanListComponent", () => {
	let component: AdminPaymentPlanListComponent;
	let fixture: ComponentFixture<AdminPaymentPlanListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AdminPaymentPlanListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminPaymentPlanListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
