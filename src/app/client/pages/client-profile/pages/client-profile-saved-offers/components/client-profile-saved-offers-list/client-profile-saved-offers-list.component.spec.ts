import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileSavedOffersListComponent } from "./client-profile-saved-offers-list.component";

describe("ClientProfileSavedOffersListComponent", () => {
	let component: ClientProfileSavedOffersListComponent;
	let fixture: ComponentFixture<ClientProfileSavedOffersListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileSavedOffersListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileSavedOffersListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
