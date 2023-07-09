import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileYourWorkspaceComponent } from "./client-profile-your-workspace.component";

describe("ClientProfileYourWorkspaceComponent", () => {
	let component: ClientProfileYourWorkspaceComponent;
	let fixture: ComponentFixture<ClientProfileYourWorkspaceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileYourWorkspaceComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileYourWorkspaceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
