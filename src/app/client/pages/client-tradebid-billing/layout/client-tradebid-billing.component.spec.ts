import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientTradebidBillingComponent } from "./client-tradebid-billing.component";

describe("ClientTradebidBillingComponent", () => {
	let component: ClientTradebidBillingComponent;
	let fixture: ComponentFixture<ClientTradebidBillingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientTradebidBillingComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientTradebidBillingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
