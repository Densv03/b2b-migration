import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileTradebidManageRfqComponent } from "./client-profile-tradebid-manage-rfq.component";

describe("ClientProfileTradebidManageRfqComponent", () => {
	let component: ClientProfileTradebidManageRfqComponent;
	let fixture: ComponentFixture<ClientProfileTradebidManageRfqComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileTradebidManageRfqComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileTradebidManageRfqComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
