import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileAddPaymentMethod } from "./client-profile-add-payment-method.component";

describe("ClientProfileAddPaymentMethod", () => {
	let component: ClientProfileAddPaymentMethod;
	let fixture: ComponentFixture<ClientProfileAddPaymentMethod>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileAddPaymentMethod],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileAddPaymentMethod);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
