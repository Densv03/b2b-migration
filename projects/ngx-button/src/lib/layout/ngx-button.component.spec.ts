import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bButtonComponent } from "libs/ngx-button/src/lib/layout/ngx-button.component";

describe("ButtonComponent", () => {
	let component: B2bButtonComponent;
	let fixture: ComponentFixture<B2bButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bButtonComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
