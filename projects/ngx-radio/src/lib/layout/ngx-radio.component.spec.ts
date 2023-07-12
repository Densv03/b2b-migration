import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NgxRadioComponent } from "./ngx-radio.component";

describe("NgxRadioComponent", () => {
	let component: NgxRadioComponent;
	let fixture: ComponentFixture<NgxRadioComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxRadioComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxRadioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
