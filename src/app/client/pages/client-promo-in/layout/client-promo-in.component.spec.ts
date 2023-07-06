import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientPromoInComponent } from "./client-promo-in.component";

describe("ClientPromoInComponent", () => {
	let component: ClientPromoInComponent;
	let fixture: ComponentFixture<ClientPromoInComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientPromoInComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientPromoInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
