import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bNgxCheckboxComponent } from "@b2b/ngx-checkbox";

describe("CheckboxComponent", () => {
	let component: B2bNgxCheckboxComponent;
	let fixture: ComponentFixture<B2bNgxCheckboxComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bNgxCheckboxComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bNgxCheckboxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
