import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { WikiService } from "../../../../client/services/wiki/wiki.service";
import { combineLatest, filter, mergeMap, Subject } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";
import { B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { HotToastService } from "@ngneat/hot-toast";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { MatDialog } from "@angular/material/dialog";
import {
  ConfirmationDialogComponent
} from "../../../../client/shared/components/confirmation-dialog/confirmation-dialog.component";

@UntilDestroy()
@Component({
	selector: "b2b-admin-articles",
	templateUrl: "./admin-articles.component.html",
	styleUrls: ["./admin-articles.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminArticlesComponent {
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;
	public readonly articles$: any;
	public readonly menuOptions: any;

	public readonly pageSubject: Subject<any>;
	public readonly forceSubject = new Subject();

	public totalCount: number;

	constructor(
		private readonly _wikiService: WikiService,
		private readonly _hotToastrService: HotToastService,
		private dialog: MatDialog
	) {
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;

		this.pageSubject = new Subject<any>();

		this.articles$ = this._getArticles$();
		this.menuOptions = this._getMenuOptions();

		this.totalCount = 0;
	}

	private _getArticles$() {
		const page$ = this.pageSubject.asObservable().pipe(startWith(0));
		const force$ = this.forceSubject.asObservable().pipe(startWith(true));

		return combineLatest([page$, force$]).pipe(
			map(([page]) => `?offset=${page * 10}`),
			switchMap(([queryString]: any) => this._wikiService.getArticles(queryString)),
			map((data: any) => {
				this.totalCount = data.totalCount;
				return data.posts;
			})
		);
	}

	public setPage(event: any) {
		this.pageSubject.next(event);
	}

	private _getMenuOptions() {
		return [
			{
				label: "Delete",
				icon: "delete-red",
				onClick: (user: { _id: any; }) => {
					this.dialog
						.open(ConfirmationDialogComponent, {
							data: {
								title: "Delete product",
								message: "Are you sure you want to delete this product?",
								confirmButtonText: "Delete",
								confirmButtonTheme: B2bNgxButtonThemeEnum.BACKGROUND_RED,
								cancelButtonText: "Cancel",
								cancelButtonTheme: B2bNgxButtonThemeEnum.OUTLINE_BLACK,
							},
						})
						.afterClosed()
						.pipe(
							filter((data) => !!data),
							mergeMap(() => {
								return this._wikiService.deleteArticleById(user._id).pipe(
									untilDestroyed(this),
									this._hotToastrService.observe({
										loading: "User deleting",
										success: "User deleted",
										error: "User deleting failed",
									})
								);
							})
						)
						.subscribe(() => {
							this.forceSubject.next(true);
						});
				},
			},
		];
	}
}
