import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientTradebidRfqDetailsComponent } from "./client-tradebid-rfq-details.component";

describe("ClientTradebidRfqDetailsComponent", () => {
	let component: ClientTradebidRfqDetailsComponent;
	let fixture: ComponentFixture<ClientTradebidRfqDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientTradebidRfqDetailsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientTradebidRfqDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
