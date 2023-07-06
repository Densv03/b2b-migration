import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileTradebidArchivedComponent } from "./client-profile-tradebid-archived.component";

describe("ClientProfileTradebidArchivedComponent", () => {
	let component: ClientProfileTradebidArchivedComponent;
	let fixture: ComponentFixture<ClientProfileTradebidArchivedComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileTradebidArchivedComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileTradebidArchivedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
