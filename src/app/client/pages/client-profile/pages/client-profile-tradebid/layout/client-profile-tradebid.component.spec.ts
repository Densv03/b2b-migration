import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileTradebidComponent } from "./client-profile-tradebid.component";

describe("ClientProfileTradebidComponent", () => {
	let component: ClientProfileTradebidComponent;
	let fixture: ComponentFixture<ClientProfileTradebidComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileTradebidComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileTradebidComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
