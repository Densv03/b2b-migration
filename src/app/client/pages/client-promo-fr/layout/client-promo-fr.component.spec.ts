import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientPromoFrComponent } from "./client-promo-fr.component";

describe("ClientPromoFrComponent", () => {
	let component: ClientPromoFrComponent;
	let fixture: ComponentFixture<ClientPromoFrComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientPromoFrComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientPromoFrComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
