import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientNotFoundComponent } from "apps/site/src/app/client/pages/client-not-found/layout/client-not-found.component";

describe("ClientNotFoundComponent", () => {
	let component: ClientNotFoundComponent;
	let fixture: ComponentFixture<ClientNotFoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientNotFoundComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientNotFoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
