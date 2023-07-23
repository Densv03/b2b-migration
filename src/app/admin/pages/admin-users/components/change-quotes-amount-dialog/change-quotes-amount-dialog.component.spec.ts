import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChangeQuotesAmountDialogComponent } from "./change-quotes-amount-dialog.component";

describe("ChangeQuotesAmountDialogComponent", () => {
	let component: ChangeQuotesAmountDialogComponent;
	let fixture: ComponentFixture<ChangeQuotesAmountDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChangeQuotesAmountDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChangeQuotesAmountDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
