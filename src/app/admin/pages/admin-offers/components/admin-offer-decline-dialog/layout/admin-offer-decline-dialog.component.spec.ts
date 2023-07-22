import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminOfferDeclineDialogComponent } from "./admin-offer-decline-dialog.component";

describe("AdminOfferDeclineDialogComponent", () => {
	let component: AdminOfferDeclineDialogComponent;
	let fixture: ComponentFixture<AdminOfferDeclineDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AdminOfferDeclineDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminOfferDeclineDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
