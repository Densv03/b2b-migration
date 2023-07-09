import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientHomeSolutionsComponent } from "./client-home-solutions.component";

describe("ClientHomeSolutionsComponent", () => {
	let component: ClientHomeSolutionsComponent;
	let fixture: ComponentFixture<ClientHomeSolutionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientHomeSolutionsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientHomeSolutionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
