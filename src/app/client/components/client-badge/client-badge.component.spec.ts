import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientBadgeComponent } from "./client-badge.component";

describe("ClientBadgeComponent", () => {
	let component: ClientBadgeComponent;
	let fixture: ComponentFixture<ClientBadgeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientBadgeComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientBadgeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
