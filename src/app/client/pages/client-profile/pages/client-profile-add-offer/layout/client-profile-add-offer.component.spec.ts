import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientAddOfferComponent } from "./client-add-offer.component";

describe("ClientAddOfferComponent", () => {
	let component: ClientAddOfferComponent;
	let fixture: ComponentFixture<ClientAddOfferComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientAddOfferComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientAddOfferComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
