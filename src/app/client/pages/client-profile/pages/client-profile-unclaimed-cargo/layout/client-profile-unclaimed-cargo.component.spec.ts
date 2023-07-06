import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileUnclaimedCargoComponent } from "./client-profile-unclaimed-cargo.component";

describe("ClientProfileUnclaimedCargoComponent", () => {
	let component: ClientProfileUnclaimedCargoComponent;
	let fixture: ComponentFixture<ClientProfileUnclaimedCargoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileUnclaimedCargoComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileUnclaimedCargoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
