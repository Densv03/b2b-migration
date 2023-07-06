import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthRegisterGoogleAccountComponent } from "../layout/auth-register-google-account.component";

describe("AuthRegisterGoogleAccountComponent", () => {
	let component: AuthRegisterGoogleAccountComponent;
	let fixture: ComponentFixture<AuthRegisterGoogleAccountComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthRegisterGoogleAccountComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthRegisterGoogleAccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
