import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectBillingMethodDialogComponent } from "./select-billing-method-dialog.component";

describe("SelectBillingMethodDialogComponent", () => {
	let component: SelectBillingMethodDialogComponent;
	let fixture: ComponentFixture<SelectBillingMethodDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectBillingMethodDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectBillingMethodDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
