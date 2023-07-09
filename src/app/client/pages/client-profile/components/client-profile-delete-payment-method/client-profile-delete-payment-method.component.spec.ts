import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileDeletePaymentMethodComponent } from "./client-profile-delete-payment-method.component";

describe("ClientProfileDeletePaymentMethodComponent", () => {
	let component: ClientProfileDeletePaymentMethodComponent;
	let fixture: ComponentFixture<ClientProfileDeletePaymentMethodComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileDeletePaymentMethodComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileDeletePaymentMethodComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
