import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminOfferChatsDialogComponent } from "./admin-offer-chats-dialog.component";

describe("AdminOfferChatsDialogComponent", () => {
	let component: AdminOfferChatsDialogComponent;
	let fixture: ComponentFixture<AdminOfferChatsDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AdminOfferChatsDialogComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminOfferChatsDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
