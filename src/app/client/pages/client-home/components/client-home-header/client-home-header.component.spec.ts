import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientHomeHeaderComponent } from "./client-home-header.component";

describe("ClientHomeHeaderComponent", () => {
	let component: ClientHomeHeaderComponent;
	let fixture: ComponentFixture<ClientHomeHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientHomeHeaderComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientHomeHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
