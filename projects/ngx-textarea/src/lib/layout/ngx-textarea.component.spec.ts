import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bNgxTextareaComponent } from "./ngx-textarea.component";

describe("B2bNgxTextareaComponent", () => {
	let component: B2bNgxTextareaComponent;
	let fixture: ComponentFixture<B2bNgxTextareaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bNgxTextareaComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bNgxTextareaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
