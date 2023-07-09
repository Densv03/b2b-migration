import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthRecoverAccountModule } from "../auth-recover-account/auth-recover-account.module";
import { AuthGoogleSignInSuccessRoutingModule } from "./auth-google-sign-in-success-routing.module";
import { AuthGoogleSignInSuccessComponent } from "./layout/auth-google-sign-in-success.component";

@NgModule({
	declarations: [AuthGoogleSignInSuccessComponent],
	imports: [CommonModule, AuthGoogleSignInSuccessRoutingModule, AuthRecoverAccountModule],
})
export class AuthGoogleSignInSuccessModule {}
