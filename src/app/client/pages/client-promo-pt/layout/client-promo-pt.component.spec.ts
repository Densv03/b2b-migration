import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientPromoPtComponent } from "./client-promo-pt.component";

describe("ClientPromoPtComponent", () => {
	let component: ClientPromoPtComponent;
	let fixture: ComponentFixture<ClientPromoPtComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientPromoPtComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientPromoPtComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
