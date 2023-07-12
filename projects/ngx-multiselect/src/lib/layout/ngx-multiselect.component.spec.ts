import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bMultiselectComponent } from "./ngx-multiselect.component";

describe("B2bMultiselectComponent", () => {
	let component: B2bMultiselectComponent;
	let fixture: ComponentFixture<B2bMultiselectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bMultiselectComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bMultiselectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
