import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NgxFileComponent } from "./ngx-file.component";

describe("NgxFileComponent", () => {
	let component: NgxFileComponent;
	let fixture: ComponentFixture<NgxFileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxFileComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxFileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
