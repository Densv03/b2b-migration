import { Component, Inject, OnInit, Optional } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { HotToastRef } from "@ngneat/hot-toast";

@Component({
	selector: "b2b-auth-guard",
	templateUrl: "./auth-guard.component.html",
	styleUrls: ["./auth-guard.component.scss"],
})
export class AuthGuardComponent {
	constructor(
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		@Optional() @Inject(HotToastRef) public toastRef: HotToastRef<any>
	) {}
}
