import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthJoinUsRolesListComponent } from "./auth-join-us-roles-list.component";

describe("AuthJoinUsRolesListComponent", () => {
	let component: AuthJoinUsRolesListComponent;
	let fixture: ComponentFixture<AuthJoinUsRolesListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthJoinUsRolesListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthJoinUsRolesListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
