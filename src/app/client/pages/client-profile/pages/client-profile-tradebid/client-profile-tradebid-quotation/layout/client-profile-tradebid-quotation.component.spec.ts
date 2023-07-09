import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileTradebidQuotationComponent } from "./client-profile-tradebid-quotation.component";

describe("ClientProfileTradebidQuotationComponent", () => {
	let component: ClientProfileTradebidQuotationComponent;
	let fixture: ComponentFixture<ClientProfileTradebidQuotationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileTradebidQuotationComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileTradebidQuotationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
