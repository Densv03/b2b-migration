import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthRecoverAccountComponent } from "../auth-recover-account/auth-recover-account.component";

describe("AuthRecoverAccountComponent", () => {
	let component: AuthRecoverAccountComponent;
	let fixture: ComponentFixture<AuthRecoverAccountComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthRecoverAccountComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthRecoverAccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
