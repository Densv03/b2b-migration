import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bPhoneComponent } from "libs/ngx-tel/src/lib/layout/ngx-tel.component";

describe("B2bPhoneComponent", () => {
	let component: B2bPhoneComponent;
	let fixture: ComponentFixture<B2bPhoneComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bPhoneComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bPhoneComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
