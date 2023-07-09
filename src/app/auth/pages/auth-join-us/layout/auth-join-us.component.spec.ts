import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthJoinUsComponent } from "apps/site/src/app/auth/pages/auth-join-us/layout/auth-join-us.component";

describe("AuthJoinUsComponent", () => {
	let component: AuthJoinUsComponent;
	let fixture: ComponentFixture<AuthJoinUsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthJoinUsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthJoinUsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
