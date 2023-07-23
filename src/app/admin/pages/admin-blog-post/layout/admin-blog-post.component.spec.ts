import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminBlogPostComponent } from "./admin-blog-post.component";

describe("AdminBlogPostComponent", () => {
	let component: AdminBlogPostComponent;
	let fixture: ComponentFixture<AdminBlogPostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AdminBlogPostComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminBlogPostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
