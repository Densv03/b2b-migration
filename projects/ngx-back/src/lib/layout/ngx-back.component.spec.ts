import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NgxBackComponent } from "./ngx-back.component";

describe("NgxBackComponent", () => {
	let component: NgxBackComponent;
	let fixture: ComponentFixture<NgxBackComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxBackComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxBackComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
