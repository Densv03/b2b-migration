import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NgxChatsListComponent } from "./ngx-chats-list.component";

describe("NgxChatsListComponent", () => {
	let component: NgxChatsListComponent;
	let fixture: ComponentFixture<NgxChatsListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxChatsListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxChatsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
