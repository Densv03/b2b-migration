import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileBillingDialogComponent } from "./client-profile-billing-dialog.component";

describe("ClientProfileBillingDialogComponent", () => {
	let component: ClientProfileBillingDialogComponent;
	let fixture: ComponentFixture<ClientProfileBillingDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileBillingDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileBillingDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
