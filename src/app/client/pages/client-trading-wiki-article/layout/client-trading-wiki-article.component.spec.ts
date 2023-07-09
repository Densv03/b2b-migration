import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientTradingWikiArticleComponent } from "apps/site/src/app/client/pages/client-trading-wiki-article/layout/client-trading-wiki-article.component";

describe("ClientTradingWikiArticleComponent", () => {
	let component: ClientTradingWikiArticleComponent;
	let fixture: ComponentFixture<ClientTradingWikiArticleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientTradingWikiArticleComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientTradingWikiArticleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
