import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bCheckboxComponent } from "libs/ngx-checkbox/src/lib/layout/ngx-checkbox.component";

describe("CheckboxComponent", () => {
	let component: B2bCheckboxComponent;
	let fixture: ComponentFixture<B2bCheckboxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bCheckboxComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bCheckboxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
