import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MakeQuoteDialogComponent } from "./make-quote-dialog.component";

describe("MakeQuoteDialogComponent", () => {
	let component: MakeQuoteDialogComponent;
	let fixture: ComponentFixture<MakeQuoteDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MakeQuoteDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MakeQuoteDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
