import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthGoogleSignInSuccessComponent } from "./auth-google-sign-in-success.component";

describe("AuthGoogleSignInSuccessComponent", () => {
	let component: AuthGoogleSignInSuccessComponent;
	let fixture: ComponentFixture<AuthGoogleSignInSuccessComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthGoogleSignInSuccessComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthGoogleSignInSuccessComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
