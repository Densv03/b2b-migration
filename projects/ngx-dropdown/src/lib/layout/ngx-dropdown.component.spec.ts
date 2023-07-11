import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bNgxDropdownComponent } from "./ngx-dropdown.component";

describe("B2bNgxDropdownComponent", () => {
	let component: B2bNgxDropdownComponent;
	let fixture: ComponentFixture<B2bNgxDropdownComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bNgxDropdownComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bNgxDropdownComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
