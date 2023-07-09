import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientRegistrationCompleteComponent } from "./client-registration-complete.component";

describe("ClientRegistrationCompleteComponent", () => {
	let component: ClientRegistrationCompleteComponent;
	let fixture: ComponentFixture<ClientRegistrationCompleteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientRegistrationCompleteComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientRegistrationCompleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
