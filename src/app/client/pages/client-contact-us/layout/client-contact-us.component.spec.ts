import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientContactUsComponent } from "./client-contact-us.component";

describe("ClientContactUsComponent", () => {
	let component: ClientContactUsComponent;
	let fixture: ComponentFixture<ClientContactUsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientContactUsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientContactUsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
