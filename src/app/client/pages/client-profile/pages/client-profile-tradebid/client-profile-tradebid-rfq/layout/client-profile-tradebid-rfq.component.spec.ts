import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileTradebidRfqComponent } from "./client-profile-tradebid-rfq.component";

describe("ClientProfileTradebidRfqComponent", () => {
	let component: ClientProfileTradebidRfqComponent;
	let fixture: ComponentFixture<ClientProfileTradebidRfqComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileTradebidRfqComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileTradebidRfqComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
