import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { User } from "../../../core/models/user/user.model";
import {B2bAuthRootRoleInterface} from "../../../../../projects/shared/src/interfaces/b2b-auth-root-role.interface";
import {AuthState, AuthStore} from "./auth.store";
import {B2bAuthRoleInterface} from "../../../../../projects/shared/src/interfaces/b2b-auth-role.interface";

@Injectable({ providedIn: "root" })
export class AuthQuery extends Query<AuthState> {
	public readonly selectRoles$: Observable<B2bAuthRoleInterface[]>;
	public readonly selectRole$: Observable<B2bAuthRoleInterface | null>;
	public readonly selectRootRoles$: Observable<B2bAuthRootRoleInterface[]>;
	public readonly selectRootRole$: Observable<B2bAuthRootRoleInterface | null>;
	public readonly selectUser$: Observable<User>;
	public readonly selectToken$: Observable<any>;

	constructor(protected override store: AuthStore) {
		super(store);

		this.selectRoles$ = this.select("roles");
		this.selectRole$ = this.select("role");
		this.selectRootRoles$ = this.select("rootRoles");
		this.selectRootRole$ = this.select("rootRole");
		this.selectUser$ = this.select("user");
		this.selectToken$ = this.select("token");
	}
}
