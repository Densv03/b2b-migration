import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bNgxSelectComponent } from "libs/ngx-select/src/lib/layout/ngx-select.component";

describe("B2bNgxSelectComponent", () => {
	let component: B2bNgxSelectComponent;
	let fixture: ComponentFixture<B2bNgxSelectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bNgxSelectComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bNgxSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
