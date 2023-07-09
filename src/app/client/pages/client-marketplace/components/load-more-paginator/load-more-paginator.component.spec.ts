import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoadMorePaginatorComponent } from "./load-more-paginator.component";

describe("LoadMorePaginatorComponent", () => {
	let component: LoadMorePaginatorComponent;
	let fixture: ComponentFixture<LoadMorePaginatorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoadMorePaginatorComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadMorePaginatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
