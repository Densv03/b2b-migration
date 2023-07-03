import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NgxIconComponent } from "./ngx-icon.component";

describe("NgxIconComponent", () => {
	let component: NgxIconComponent;
	let fixture: ComponentFixture<NgxIconComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxIconComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
