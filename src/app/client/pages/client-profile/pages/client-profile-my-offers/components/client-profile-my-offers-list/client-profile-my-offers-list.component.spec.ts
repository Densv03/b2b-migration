import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileMyOffersListComponent } from "./client-profile-my-offers-list.component";

describe("ClientProfileMyOffersListComponent", () => {
	let component: ClientProfileMyOffersListComponent;
	let fixture: ComponentFixture<ClientProfileMyOffersListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileMyOffersListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileMyOffersListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
