import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileUpgradePlan } from "./client-profile-upgrade-plan.component";

describe("ClientProfileUpgradePlan", () => {
	let component: ClientProfileUpgradePlan;
	let fixture: ComponentFixture<ClientProfileUpgradePlan>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileUpgradePlan],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileUpgradePlan);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
