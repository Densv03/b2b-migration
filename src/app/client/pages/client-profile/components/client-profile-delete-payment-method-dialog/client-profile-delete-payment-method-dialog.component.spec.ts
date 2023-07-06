import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileDeletePaymentMethodDialogComponent } from "./client-profile-delete-payment-method-dialog.component";

describe("ClientProfileDeletePaymentMethodDialogComponent", () => {
	let component: ClientProfileDeletePaymentMethodDialogComponent;
	let fixture: ComponentFixture<ClientProfileDeletePaymentMethodDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileDeletePaymentMethodDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileDeletePaymentMethodDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
