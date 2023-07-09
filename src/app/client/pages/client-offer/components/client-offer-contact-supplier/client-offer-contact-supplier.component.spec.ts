import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientOfferContactSupplierComponent } from "./client-offer-contact-supplier.component";

describe("ClientOfferContactSupplierComponent", () => {
	let component: ClientOfferContactSupplierComponent;
	let fixture: ComponentFixture<ClientOfferContactSupplierComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientOfferContactSupplierComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientOfferContactSupplierComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
