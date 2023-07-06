import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientTradeBidAddRfqComponent } from "./client-trade-bid-add-rfq.component";

describe("ClientTradebidAddRfqComponent", () => {
	let component: ClientTradeBidAddRfqComponent;
	let fixture: ComponentFixture<ClientTradeBidAddRfqComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientTradeBidAddRfqComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientTradeBidAddRfqComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
