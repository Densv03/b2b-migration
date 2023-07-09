import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthRegisterIndividualAccountFirstStepComponent } from "./auth-register-individual-account-first-step.component";

describe("AuthRegisterIndividualAccountFirstStepComponent", () => {
	let component: AuthRegisterIndividualAccountFirstStepComponent;
	let fixture: ComponentFixture<AuthRegisterIndividualAccountFirstStepComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthRegisterIndividualAccountFirstStepComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthRegisterIndividualAccountFirstStepComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
