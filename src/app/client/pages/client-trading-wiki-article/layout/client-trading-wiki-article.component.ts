import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { B2bNgxButtonThemeEnum } from '@b2b/ngx-button';
import { HotToastService } from '@ngneat/hot-toast';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { WikiService } from '../../../services/wiki/wiki.service';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'b2b-client-trading-wiki-article',
  templateUrl: './client-trading-wiki-article.component.html',
  styleUrls: ['./client-trading-wiki-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTradingWikiArticleComponent {
  public readonly offers$: Observable<any>;
  public readonly socialMedias: any;
  public readonly tradingWikiOptions: any;
  public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

  public readonly article$: any;

  public readonly formGroup: FormGroup;

  public readonly commnets$: any;

  public getNewComments: Subject<any>;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly wikiService: WikiService,
    private readonly _formBuilder: FormBuilder,
    private readonly _hotToastService: HotToastService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
    this.getNewComments = new Subject();
    this.socialMedias = this.getSocialMedias();
    this.tradingWikiOptions = [];
    this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

    this.article$ = this.getArticle();

    this.formGroup = this._formBuilder.group({
      text: '',
    });

    this.commnets$ = this.getComments();
  }

  public getComments() {
    const paramMap$ = this._activatedRoute.paramMap;
    const getNewComments$ = this.getNewComments.pipe(startWith(true));
    return combineLatest([paramMap$, getNewComments$]).pipe(
      map(([paramMap]) => paramMap.get('id')),
      switchMap((id) => this.wikiService.getComments(id))
    );
  }

  public createCommnet(articleId, formGroup) {
    if (!this._authService.getToken()) {
      this._router.navigateByUrl('auth/register-credentials');
      return;
    }
    this.wikiService
      .createComment(articleId, formGroup.text)
      .pipe(
        this._hotToastService.observe({
          loading: 'Comment creating...',
          success: 'Comment created successfully!',
          error: 'You have to be authorized',
        })
      )
      .subscribe((res) => {
        this.getNewComments.next(true);
      });
  }

  public getSocialMedias() {
    return [
      {
        icon: 'facebook',
        href: 'https://www.facebook.com/',
        share: 'facebook',
      },
      {
        icon: 'linkedin',
        href: 'https://www.linkedin.com/',
        share: 'linkedin',
      },
    ];
  }

  public getArticle() {
    return this._activatedRoute.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      switchMap((id) => this.wikiService.getArticleById(id))
    );
  }

  processShareBtn(shareName) {
    this._ampService.logEvent('Click on share button', {
      type: shareName,
    });
  }
}
