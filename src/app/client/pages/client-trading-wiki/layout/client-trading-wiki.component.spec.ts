import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientTradingWikiComponent } from "./client-trading-wiki.component";

describe("ClientTradingWikiComponent", () => {
	let component: ClientTradingWikiComponent;
	let fixture: ComponentFixture<ClientTradingWikiComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientTradingWikiComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientTradingWikiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
