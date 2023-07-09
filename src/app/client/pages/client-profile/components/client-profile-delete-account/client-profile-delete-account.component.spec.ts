import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileDeleteAccountComponent } from "./client-profile-delete-account.component";

describe("ClientProfileDeleteAccountComponent", () => {
	let component: ClientProfileDeleteAccountComponent;
	let fixture: ComponentFixture<ClientProfileDeleteAccountComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileDeleteAccountComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileDeleteAccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
