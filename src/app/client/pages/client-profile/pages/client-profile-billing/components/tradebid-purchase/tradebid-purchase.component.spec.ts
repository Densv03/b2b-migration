import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TradebidPurchaseComponent } from "./tradebid-purchase.component";

describe("TradebidPurchaseComponent", () => {
	let component: TradebidPurchaseComponent;
	let fixture: ComponentFixture<TradebidPurchaseComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TradebidPurchaseComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TradebidPurchaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
