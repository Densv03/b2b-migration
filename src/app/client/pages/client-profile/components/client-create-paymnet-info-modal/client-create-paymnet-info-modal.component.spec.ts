import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientCreatePaymnetInfoModalComponent } from "./client-create-paymnet-info-modal.component";

describe("ClientCreatePaymnetInfoModalComponent", () => {
	let component: ClientCreatePaymnetInfoModalComponent;
	let fixture: ComponentFixture<ClientCreatePaymnetInfoModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientCreatePaymnetInfoModalComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientCreatePaymnetInfoModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
