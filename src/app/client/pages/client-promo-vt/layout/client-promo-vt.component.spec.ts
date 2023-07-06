import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientPromoVtComponent } from "./client-promo-vt.component";

describe("ClientPromoVtComponent", () => {
	let component: ClientPromoVtComponent;
	let fixture: ComponentFixture<ClientPromoVtComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientPromoVtComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientPromoVtComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
