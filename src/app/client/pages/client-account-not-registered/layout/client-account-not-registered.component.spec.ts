import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientAccountNotRegisteredComponent } from "./client-account-not-registered.component";

describe("ClientAccountNotRegisteredComponent", () => {
	let component: ClientAccountNotRegisteredComponent;
	let fixture: ComponentFixture<ClientAccountNotRegisteredComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientAccountNotRegisteredComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientAccountNotRegisteredComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
