import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NgxImagesCarouselComponent } from "./ngx-images-carousel.component";

describe("NgxImagesCarouselComponent", () => {
	let component: NgxImagesCarouselComponent;
	let fixture: ComponentFixture<NgxImagesCarouselComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxImagesCarouselComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxImagesCarouselComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
