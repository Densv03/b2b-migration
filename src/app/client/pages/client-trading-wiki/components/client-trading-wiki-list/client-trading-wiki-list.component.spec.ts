import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientTradingWikiListComponent } from "./client-trading-wiki-list.component";

describe("ClientTradingWikiListComponent", () => {
	let component: ClientTradingWikiListComponent;
	let fixture: ComponentFixture<ClientTradingWikiListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientTradingWikiListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientTradingWikiListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
