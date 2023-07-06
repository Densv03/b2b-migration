import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientOfferReportComponent } from "./client-offer-report.component";

describe("ClientOfferReportComponent", () => {
	let component: ClientOfferReportComponent;
	let fixture: ComponentFixture<ClientOfferReportComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientOfferReportComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientOfferReportComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
