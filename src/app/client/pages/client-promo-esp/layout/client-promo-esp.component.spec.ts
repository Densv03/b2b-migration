import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientPromoEspComponent } from "./client-promo-esp.component";

describe("ClientPromoEspComponent", () => {
	let component: ClientPromoEspComponent;
	let fixture: ComponentFixture<ClientPromoEspComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientPromoEspComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientPromoEspComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
