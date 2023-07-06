import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileYourAccountComponent } from "./client-profile-your-account.component";

describe("ClientProfileYourAccountComponent", () => {
	let component: ClientProfileYourAccountComponent;
	let fixture: ComponentFixture<ClientProfileYourAccountComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileYourAccountComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileYourAccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
