import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientBlogArticleComponent } from "./client-blog-article.component";

describe("ClientBlogArticleComponent", () => {
	let component: ClientBlogArticleComponent;
	let fixture: ComponentFixture<ClientBlogArticleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientBlogArticleComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientBlogArticleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
