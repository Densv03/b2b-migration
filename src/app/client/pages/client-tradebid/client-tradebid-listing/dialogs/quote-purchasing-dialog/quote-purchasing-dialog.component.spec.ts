import { ComponentFixture, TestBed } from "@angular/core/testing";

import { QuotePurchasingDialogComponent } from "./quote-purchasing-dialog.component";

describe("QuotePurchasingDialogComponent", () => {
	let component: QuotePurchasingDialogComponent;
	let fixture: ComponentFixture<QuotePurchasingDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [QuotePurchasingDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(QuotePurchasingDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
