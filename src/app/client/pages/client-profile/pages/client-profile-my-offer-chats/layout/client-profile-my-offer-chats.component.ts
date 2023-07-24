import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from '@b2b/ngx-link';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../../../../auth/services/auth/auth.service';
import { ChatsService } from 'src/app/client/services/chats/chats.service';

@UntilDestroy()
@Component({
  selector: 'b2b-client-profile-my-offer-chats',
  templateUrl: './client-profile-my-offer-chats.component.html',
  styleUrls: ['./client-profile-my-offer-chats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfileMyOfferChatsComponent {
  public readonly chats$: Observable<any>;
  public readonly chatsSkeletonOptions: any;
  public readonly sellerOptions: any;
  public readonly buyerOptions: any;
  public readonly dropdownOptions: any;
  public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;
  public loading: boolean;

  constructor(
    private readonly _chatsService: ChatsService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _hotToastService: HotToastService,
    private readonly _authService: AuthService,
    private readonly _translocoService: TranslocoService,
    public readonly b2bNgxLinkService: B2bNgxLinkService
  ) {
    this.chats$ = this.getChats();
    this.chatsSkeletonOptions = this.getChatsSkeletonOptions();
    this.dropdownOptions = this.getDropdownOptions();
    this.sellerOptions = this.getSellerOptions();
    this.buyerOptions = this.getDropdownOptions();

    this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
  }
  public getSellerOptions() {
    return [
      // {
      // 	label: "Request contacts",
      // 	icon: "user-2",
      // 	onClick: (chat) => {
      // 		this._chatsService.requestContacts(chat._id).pipe(
      // 			untilDestroyed(this),
      // 			this._hotToastService.observe({
      // 				loading: "Contacts requesting...",
      // 				success: "Contacts requested successfully!",
      // 				error: "Contacts requesting failed!",
      // 			})
      // 		).subscribe()
      // 	},
      // },
      {
        label: this._translocoService.translate('OFFERS.SEND_CONTACTS'),
        icon: 'card',
        onClick: async (chat) => {
          this._chatsService.sendContacts(chat.offer, chat.buyer?._id);

          this._hotToastService.success(
            this._translocoService.translate('TOASTR.SUCCESS')
          );
        },
      },
      {
        label: this._translocoService.translate('OFFERS.UNHIDE_PRODUCT_INFO'),
        icon: 'trainings',
        onClick: (chat) => {
          this._chatsService
            .openContacts(chat.offer, chat.buyer?._id)
            .pipe(
              untilDestroyed(this),
              this._hotToastService.observe({
                loading: this._translocoService.translate('TOASTR.LOADING'),
                success: this._translocoService.translate('TOASTR.SUCCESS'),
                error: this._translocoService.translate('TOASTR.ERROR'),
              })
            )
            .subscribe();
        },
      },
      {
        label: this._translocoService.translate('OFFERS.HIDE_PRODUCT_INFO'),
        icon: 'card',
        onClick: (chat) => {
          this._chatsService
            .closeContacts(chat.offer?._id, chat.buyer?._id)
            .pipe(
              untilDestroyed(this),
              this._hotToastService.observe({
                loading: this._translocoService.translate('TOASTR.LOADING'),
                success: this._translocoService.translate('TOASTR.SUCCESS'),
                error: this._translocoService.translate('TOASTR.ERROR'),
              })
            )
            .subscribe();
        },
      },
      {
        label: this._translocoService.translate('OFFERS.DELETE'),
        icon: 'delete-red',
        onClick: (chat) => {
          this._chatsService
            .removeChatById(chat?._id)
            .pipe(
              untilDestroyed(this),
              this._hotToastService.observe({
                loading: this._translocoService.translate('TOASTR.LOADING'),
                success: this._translocoService.translate('TOASTR.SUCCESS'),
                error: this._translocoService.translate('TOASTR.ERROR'),
              })
            )
            .subscribe(() => {});
        },
      },
    ];
  }

  public getDropdownOptions() {
    return [
      {
        label: this._translocoService.translate('OFFERS.HIDE_PRODUCT_INFO'),
        icon: 'card',
        onClick: (chat) => {
          this._chatsService
            .closeContacts(chat.offer?._id, chat.buyer?._id)
            .pipe(
              untilDestroyed(this),
              this._hotToastService.observe({
                loading: this._translocoService.translate('TOASTR.LOADING'),
                success: this._translocoService.translate('TOASTR.SUCCESS'),
                error: this._translocoService.translate('TOASTR.ERROR'),
              })
            )
            .subscribe();
        },
      },
      {
        label: this._translocoService.translate('OFFERS.UNHIDE_PRODUCT_INFO'),
        icon: 'trainings',
        onClick: (chat) => {
          this._chatsService
            .openContacts(chat.offer, chat.buyer?._id)
            .pipe(
              untilDestroyed(this),
              this._hotToastService.observe({
                loading: this._translocoService.translate('TOASTR.LOADING'),
                success: this._translocoService.translate('TOASTR.SUCCESS'),
                error: this._translocoService.translate('TOASTR.ERROR'),
              })
            )
            .subscribe();
        },
      },
      {
        label: this._translocoService.translate('OFFERS.DELETE'),
        icon: 'delete-red',
        onClick: (chat) => {
          this._chatsService
            .removeChatById(chat?._id)
            .pipe(
              untilDestroyed(this),
              this._hotToastService.observe({
                loading: this._translocoService.translate('TOASTR.LOADING'),
                success: this._translocoService.translate('TOASTR.SUCCESS'),
                error: this._translocoService.translate('TOASTR.ERROR'),
              })
            )
            .subscribe(() => {});
        },
      },
    ];
  }

  public getChats() {
    this.loading = true;
    return this._activatedRoute.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      switchMap((offerId) => this._chatsService.getChatsByOffer(offerId)),
      tap(() => {
        this.loading = false;
      })
    );
  }

  public getChatsSkeletonOptions() {
    return [
      {
        count: 10,
        animation: 'progress',
        theme: {
          height: '120px',
        },
      },
    ];
  }
}
