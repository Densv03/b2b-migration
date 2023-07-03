import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bNgxCountrySelectComponent } from "./ngx-country-select.component";

describe("B2bNgxCountrySelectComponent", () => {
	let component: B2bNgxCountrySelectComponent;
	let fixture: ComponentFixture<B2bNgxCountrySelectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bNgxCountrySelectComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bNgxCountrySelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
