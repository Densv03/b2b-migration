import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileSettingsComponent } from "./client-profile-settings.component";

describe("ClientProfileSettingsComponent", () => {
	let component: ClientProfileSettingsComponent;
	let fixture: ComponentFixture<ClientProfileSettingsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileSettingsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileSettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
