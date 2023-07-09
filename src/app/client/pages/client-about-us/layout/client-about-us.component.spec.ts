import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientAboutUsComponent } from "./client-about-us.component";

describe("ClientAboutUsComponent", () => {
	let component: ClientAboutUsComponent;
	let fixture: ComponentFixture<ClientAboutUsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientAboutUsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientAboutUsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
