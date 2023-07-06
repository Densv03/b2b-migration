import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthRegisterIndividualAccountSecondStepComponent } from "./auth-register-individual-account-second-step.component";

describe("AuthRegisterIndividualAccountSecondStepComponent", () => {
	let component: AuthRegisterIndividualAccountSecondStepComponent;
	let fixture: ComponentFixture<AuthRegisterIndividualAccountSecondStepComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthRegisterIndividualAccountSecondStepComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthRegisterIndividualAccountSecondStepComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
