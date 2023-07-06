import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientPromoArComponent } from "./client-promo-ar.component";

describe("ClientPromoArComponent", () => {
	let component: ClientPromoArComponent;
	let fixture: ComponentFixture<ClientPromoArComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientPromoArComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientPromoArComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
