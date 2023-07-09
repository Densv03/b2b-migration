import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientAnnualFailedComponent } from "./client-annual-failed.component";

describe("ClientAnnualFailedComponent", () => {
	let component: ClientAnnualFailedComponent;
	let fixture: ComponentFixture<ClientAnnualFailedComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientAnnualFailedComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientAnnualFailedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
