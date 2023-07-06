import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientAnnualSucceededComponent } from "./client-annual-succeeded.component";

describe("ClientAnnualSucceededComponent", () => {
	let component: ClientAnnualSucceededComponent;
	let fixture: ComponentFixture<ClientAnnualSucceededComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientAnnualSucceededComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientAnnualSucceededComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
