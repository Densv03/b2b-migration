import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientEmailVerifyComponent } from "./client-email-verify.component";

describe("ClientEmailVerifyComponent", () => {
	let component: ClientEmailVerifyComponent;
	let fixture: ComponentFixture<ClientEmailVerifyComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientEmailVerifyComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientEmailVerifyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
