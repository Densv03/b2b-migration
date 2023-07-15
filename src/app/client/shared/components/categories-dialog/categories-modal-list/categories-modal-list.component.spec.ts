import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CategoriesModalListComponent } from "./categories-modal-list.component";

describe("CategoriesModalListComponent", () => {
	let component: CategoriesModalListComponent;
	let fixture: ComponentFixture<CategoriesModalListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CategoriesModalListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CategoriesModalListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
