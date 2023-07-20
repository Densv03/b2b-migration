import { ComponentFixture, TestBed } from "@angular/core/testing";

import { B2bNgxDividerComponent } from "./ngx-divider.component";

describe("B2bNgxDividerComponent", () => {
	let component: B2bNgxDividerComponent;
	let fixture: ComponentFixture<B2bNgxDividerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [B2bNgxDividerComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(B2bNgxDividerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
