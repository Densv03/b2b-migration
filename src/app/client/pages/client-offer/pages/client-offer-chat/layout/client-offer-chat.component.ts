import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { B2bNgxLinkService } from '@b2b/ngx-link';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { B2bNgxButtonThemeEnum } from 'libs/ngx-button/src';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { io } from 'socket.io-client';
import { environment } from '../../../../../../../environments/environment';
import { AuthService } from '../../../../../../auth/services/auth/auth.service';
import { ChatsService } from '../../../../../services/chats/chats.service';
import { SocketService } from '../../../../../services/socket/socket.service';
import { UserService } from 'src/app/client/pages/client-profile/services/user/user.service';
import { ChatService } from 'src/app/client/services/chat/chat.service';
import { OffersService } from 'src/app/client/services/offers/offers.service';

@UntilDestroy()
@Component({
  selector: 'b2b-client-profile-offer-chat',
  templateUrl: './client-offer-chat.component.html',
  styleUrls: ['./client-offer-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientOfferChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatContainer') chatContainer: ElementRef;

  public readonly formGroup: FormGroup;
  public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

  public readonly messages$: Observable<any>;
  public readonly chatInfo$: Observable<any>;

  private readonly _messagesHistoryBehaviourSubject: BehaviorSubject<any>;
  private readonly _messagesHistory$: Observable<any>;

  private readonly _messageBehaviourSubject: BehaviorSubject<any>;
  private readonly _message$: Observable<any>;

  private readonly _chatInfoBehaviourSubject: BehaviorSubject<any>;
  private readonly _chatInfo$: Observable<any>;

  private _socket: any;

  public displayRequestContacts: boolean;
  public displayOpenContacts: boolean;
  public displayCloseContacts: boolean;
  public displayContactsRequested: boolean;
  public displayContactsOpened: boolean;
  public chat: any;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _chatService: ChatService,
    private readonly _usersService: UserService,
    private readonly _offersService: OffersService,
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _socketService: SocketService,
    private readonly _router: Router,
    private readonly _chatsService: ChatsService,
    private readonly _hotToastService: HotToastService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public readonly b2bNgxLinkService: B2bNgxLinkService,
    private readonly _translocoService: TranslocoService
  ) {
    this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
    this.formGroup = this._formBuilder.group({
      message: '',
    });

    this._messagesHistoryBehaviourSubject = new BehaviorSubject<any>([]);
    this._messagesHistory$ =
      this._messagesHistoryBehaviourSubject.asObservable();

    this._messageBehaviourSubject = new BehaviorSubject<any>([]);
    this._message$ = this._messageBehaviourSubject.asObservable();

    this._chatInfoBehaviourSubject = new BehaviorSubject<any>(null);
    this._chatInfo$ = this._chatInfoBehaviourSubject.asObservable();

    this.chatInfo$ = this.getChatInfo();
    this.messages$ = this.getMessages();
  }

  public getChatInfo() {
    return this._authService.getUser().pipe(
      filter((user) => !!user),
      switchMap((user) =>
        this._chatInfo$.pipe(
          filter((chatInfo) => !!chatInfo),
          map((chatInfo) => {
            const role =
              chatInfo.buyer._id === user?._id
                ? this._translocoService.translate('CHAT.SELLER')
                : this._translocoService.translate('CHAT.BUYER');
            const displayInfo =
              role === this._translocoService.translate('CHAT.SELLER')
                ? chatInfo.offer?.contact
                : chatInfo.buyer;

            const author =
              displayInfo?.fullName ||
              displayInfo?.personName ||
              `${role} of ${chatInfo.offer?.title}`;

            return {
              ...chatInfo,
              displayInfo: { ...displayInfo, role, author },
            };
          })
        )
      )
    );
  }

  public getMessages() {
    const user$ = this._authService.getUser();
    const offer$ = this._activatedRoute.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      switchMap((id) => this._offersService.getOfferById(id))
    );

    return combineLatest([user$, offer$]).pipe(
      filter(([user, offer]) => !!user && !!offer),
      switchMap(([user, offer]: [any, any]) =>
        this._messagesHistory$.pipe(
          tap(() => {
            setTimeout(() => {
              this.chatContainer.nativeElement.scrollTop =
                this.chatContainer.nativeElement.scrollHeight;
            }, 0);
          }),
          map((messages) =>
            messages.map((message: any) => {
              const isSeller = offer.user === message.author;
              const author = isSeller
                ? message.contact?.personName ||
                  `${this._translocoService.translate('CHAT.SELLER')} of ${
                    offer.title
                  }`
                : user.fullName;

              return {
                ...message,
                contact: {
                  ...message.contact,
                  author,
                  role: isSeller
                    ? this._translocoService.translate('CHAT.SELLER')
                    : this._translocoService.translate('CHAT.BUYER'),
                },
              };
            })
          )
        )
      )
    );
  }

  public enterPressed(event: any) {
    this.sendMessage(this.formGroup.get('message').value);
    event.preventDefault();
  }

  public async sendMessage(body: any) {
    if (!body) {
      return;
    }

    this.chatInfo$.pipe(untilDestroyed(this)).subscribe((chatInfo) => {
      this._socket.emit('message', {
        type: 'text',
        body,
        userId: chatInfo.offer.user,
        offerId: chatInfo.offer._id,
      });
    });
    this.formGroup.get('message').reset();
  }

  public subscribeOnMessage() {
    return this._socket.on('message', (message: any) => {
      const history = this._messagesHistoryBehaviourSubject.getValue();
      this._messagesHistoryBehaviourSubject.next([...history, message]);
    });
  }

  public subscribeOnChatInfo() {
    return this._socket.on('chat_info', (chatInfo: any) => {
      this._socketService.readMessages(chatInfo.unreadMessagesCount);
      this._chatInfoBehaviourSubject.next(chatInfo);

      const user = this._usersService.getUser();

      const role = user._id === chatInfo.buyer?._id ? 'buyer' : 'seller';

      this.displayContactsOpened = chatInfo.offer.openedFor.includes(
        chatInfo.buyer?._id
      );
      this.displayContactsRequested =
        chatInfo.contactsRequested && !this.displayContactsOpened;
      this.displayRequestContacts =
        role === 'buyer' &&
        !this.displayContactsOpened &&
        !this.displayContactsRequested &&
        (!chatInfo.offer.visibility.email || !chatInfo.offer.visibility.phone);
      // Object.values(chatInfo.offer.visibility).some((visibility) => !visibility);
      this.displayOpenContacts =
        role === 'seller' && !this.displayContactsOpened;
      this.displayCloseContacts =
        role === 'seller' && this.displayContactsOpened;

      this.chat = chatInfo;

      if (
        user._id !== chatInfo.seller?._id &&
        user?._id !== chatInfo.buyer?._id
      ) {
        this._router.navigateByUrl(
          this.b2bNgxLinkService.getStaticLink('/latest-offers')
        );
      }
    });
  }

  public subscribeOnMessageHistory() {
    return this._socket.on('message_history', (message_history: any) => {
      this._messagesHistoryBehaviourSubject.next(message_history);
    });
  }

  openConnection(token: any) {
    if (this._socket) {
      this._socket.disconnect();
    }

    this._socket = io(environment.apiUrl, {
      path: '/chat',
      auth: {
        token,
      },
    });
  }

  ngOnInit() {
    const token$ = this._usersService.getToken$();
    const user$ = this._usersService.getUser$();
    const offer$ = this._activatedRoute.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      switchMap((id) => this._offersService.getOfferById(id))
    );

    combineLatest([offer$, token$, user$])
      .pipe(untilDestroyed(this))
      .subscribe(([offer, token]: any) => {
        this.openConnection(token);

        this.subscribeOnMessageHistory();
        this.subscribeOnChatInfo();
        this.subscribeOnMessage();

        this._socket.emit('start_chat', {
          userId: offer.user,
          offerId: offer._id,
        });
      });
  }

  requestContacts() {
    this._chatsService
      .requestContacts(this.chat)
      .pipe(
        untilDestroyed(this),
        this._hotToastService.observe({
          loading: 'Contacts requesting...',
          success: 'Contacts requested successfully!',
          error: 'Contacts requesting failed!',
        })
      )
      .subscribe(() => {
        // this._ampService.logEvent("Press contact request");
        // this._ampService.logEvent("Contact request sent");
        // this._ampService.logEvent("Get contact request");
        this.displayContactsRequested = true;
        this.displayRequestContacts = false;
        this.displayContactsOpened = false;
        this.displayContactsRequested = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  openContacts() {
    // this._ampService.logEvent("Contact request approved");

    this._chatsService.sendContacts(this.chat.offer, this.chat.buyer._id);

    // this._hotToastService.success("Contacts sent successfully!");

    this._chatsService
      .openContacts(this.chat.offer, this.chat.buyer._id)
      .pipe(
        untilDestroyed(this),
        this._hotToastService.observe({
          loading: 'Contacts opening...',
          success: 'Contacts opened successfully!',
          error: 'Contacts opening failed!',
        })
      )
      .subscribe(() => {
        this.displayOpenContacts = false;
        this.displayCloseContacts = true;
        this.changeDetectorRef.detectChanges();
      });
  }

  closeContacts() {
    this._chatsService
      .closeContacts(this.chat.offer._id, this.chat.buyer._id)
      .pipe(
        untilDestroyed(this),
        this._hotToastService.observe({
          loading: 'Contacts closing...',
          success: 'Contacts closed successfully!',
          error: 'Contacts closing failed!',
        })
      )
      .subscribe(() => {
        this.displayOpenContacts = false;
        this.displayCloseContacts = false;
        this.displayContactsOpened = false;
        this.displayContactsRequested = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this._socket) {
      this._socket.disconnect();
    }
  }
}
