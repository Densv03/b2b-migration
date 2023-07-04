import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bToggleComponent } from "libs/ngx-toggle/src/lib/layout/ngx-toggle.component";

describe("ToggleComponent", () => {
	let component: B2bToggleComponent;
	let fixture: ComponentFixture<B2bToggleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bToggleComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bToggleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
