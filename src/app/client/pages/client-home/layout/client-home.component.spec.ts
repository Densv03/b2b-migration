import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientHomeOldComponent } from "./client-home.component";

describe("ClientHomeComponent", () => {
	let component: ClientHomeOldComponent;
	let fixture: ComponentFixture<ClientHomeOldComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientHomeOldComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientHomeOldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
