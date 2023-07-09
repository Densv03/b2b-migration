import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChangeRfqFormComponent } from "./change-rfq-form.component";

describe("ChangeRfqFormComponent", () => {
	let component: ChangeRfqFormComponent;
	let fixture: ComponentFixture<ChangeRfqFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChangeRfqFormComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChangeRfqFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
