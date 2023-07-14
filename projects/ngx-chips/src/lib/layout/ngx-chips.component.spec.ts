import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bNgxChipsComponent } from "./ngx-chips.component";

describe("B2bNgxChipsComponent", () => {
	let component: B2bNgxChipsComponent;
	let fixture: ComponentFixture<B2bNgxChipsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bNgxChipsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bNgxChipsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
