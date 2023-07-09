import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthRegisterIndividualAccountComponent } from "apps/site/src/app/auth/pages/auth-register-individual-account/layout/auth-register-individual-account.component";

describe("AuthRegisterIndividualAccountComponent", () => {
	let component: AuthRegisterIndividualAccountComponent;
	let fixture: ComponentFixture<AuthRegisterIndividualAccountComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthRegisterIndividualAccountComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthRegisterIndividualAccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
