import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RfqButtonsComponent } from "./rfq-buttons.component";

describe("RfqButtonsComponent", () => {
	let component: RfqButtonsComponent;
	let fixture: ComponentFixture<RfqButtonsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RfqButtonsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RfqButtonsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
