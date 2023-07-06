import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileBillingComponent } from "./client-profile-billing.component";

describe("ClientProfileBillingComponent", () => {
	let component: ClientProfileBillingComponent;
	let fixture: ComponentFixture<ClientProfileBillingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileBillingComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileBillingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
