import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileSidenavComponent } from "./client-profile-sidenav.component";

describe("ClientProfileSidenavComponent", () => {
	let component: ClientProfileSidenavComponent;
	let fixture: ComponentFixture<ClientProfileSidenavComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileSidenavComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileSidenavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
