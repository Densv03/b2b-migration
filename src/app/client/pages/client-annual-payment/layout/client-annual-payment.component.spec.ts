import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientPaymentDetailsComponent } from "apps/site/src/app/client/pages/client-annual-payment/layout/client-annual-payment.component";

describe("ClientPaymentDetailsComponent", () => {
	let component: ClientPaymentDetailsComponent;
	let fixture: ComponentFixture<ClientPaymentDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientPaymentDetailsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientPaymentDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
