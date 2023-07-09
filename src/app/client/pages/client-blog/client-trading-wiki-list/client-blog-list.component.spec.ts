import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientBlogListComponent } from "./client-blog-list.component";

describe("ClientBlogListComponent", () => {
	let component: ClientBlogListComponent;
	let fixture: ComponentFixture<ClientBlogListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientBlogListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientBlogListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
