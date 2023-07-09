import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileAddPaymentDialogComponent } from "./client-profile-add-payment-modal.component";

describe("ClientProfileAddPaymentModalComponent", () => {
	let component: ClientProfileAddPaymentDialogComponent;
	let fixture: ComponentFixture<ClientProfileAddPaymentDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileAddPaymentDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileAddPaymentDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
