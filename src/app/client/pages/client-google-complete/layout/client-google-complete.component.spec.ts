import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientGoogleCompleteComponent } from "./client-google-complete.component";

describe("ClientGoogleCompleteComponent", () => {
	let component: ClientGoogleCompleteComponent;
	let fixture: ComponentFixture<ClientGoogleCompleteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientGoogleCompleteComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientGoogleCompleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
