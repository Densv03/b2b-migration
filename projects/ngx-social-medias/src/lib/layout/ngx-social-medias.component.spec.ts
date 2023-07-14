import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NgxSocialMediasComponent } from "./ngx-social-medias.component";

describe("NgxSocialMediasComponent", () => {
	let component: NgxSocialMediasComponent;
	let fixture: ComponentFixture<NgxSocialMediasComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxSocialMediasComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxSocialMediasComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
