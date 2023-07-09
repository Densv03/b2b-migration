import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientTradebidQuotationFormComponent } from "./client-tradebid-quotation-form.component";

describe("ClientTradebidQuotationFormComponent", () => {
	let component: ClientTradebidQuotationFormComponent;
	let fixture: ComponentFixture<ClientTradebidQuotationFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientTradebidQuotationFormComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientTradebidQuotationFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
