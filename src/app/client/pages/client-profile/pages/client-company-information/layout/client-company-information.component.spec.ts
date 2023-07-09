import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientCompanyInformationComponent } from "./client-company-information.component";

describe("ClientCompanyInformationComponent", () => {
	let component: ClientCompanyInformationComponent;
	let fixture: ComponentFixture<ClientCompanyInformationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientCompanyInformationComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientCompanyInformationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
