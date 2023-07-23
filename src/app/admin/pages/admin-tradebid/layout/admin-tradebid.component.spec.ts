import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminTradebidComponent } from "./admin-tradebid.component";

describe("AdminTradebidComponent", () => {
	let component: AdminTradebidComponent;
	let fixture: ComponentFixture<AdminTradebidComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AdminTradebidComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminTradebidComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
