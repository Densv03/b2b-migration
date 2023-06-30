import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bNgxInputComponent } from "libs/ngx-input/src/lib/layout/ngx-input.component";

describe("B2bNgxInputComponent", () => {
	let component: B2bNgxInputComponent;
	let fixture: ComponentFixture<B2bNgxInputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bNgxInputComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bNgxInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
