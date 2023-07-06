import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientSeanQuizComponent } from "./client-sean-quiz.component";

describe("ClientSeanQuizComponent", () => {
	let component: ClientSeanQuizComponent;
	let fixture: ComponentFixture<ClientSeanQuizComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientSeanQuizComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientSeanQuizComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
