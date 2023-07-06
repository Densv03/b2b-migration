import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientQuizComponent } from "./client-quiz.component";

describe("ClientQuizComponent", () => {
	let component: ClientQuizComponent;
	let fixture: ComponentFixture<ClientQuizComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientQuizComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientQuizComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
