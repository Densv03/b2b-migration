import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChatsItemComponent } from "./chats-item.component";

describe("ChatsItemComponent", () => {
	let component: ChatsItemComponent;
	let fixture: ComponentFixture<ChatsItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChatsItemComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChatsItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
