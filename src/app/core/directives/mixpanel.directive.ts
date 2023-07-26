import {Directive, HostListener, Input} from '@angular/core';
import {MixpanelService} from "../services/mixpanel/mixpanel.service";
@Directive({
  selector: '[b2bMixpanel]'
})
export class MixpanelDirective {
  @Input() mixpanel: string;
  @Input() track: string;
  @Input() identify: string;
  @Input() userName: string;
  @HostListener('click', ['$event']) onClick(): void {
    // switch (this.mixpanel) {
    //   case 'track':
    //     this.mixpanelService.track(this.track);
    //     break
    //
    //   case 'login':
    //     this.mixpanelService.logIn(this.identify);
    //     break
    //
    //   case 'signUp':
    //     this.mixpanelService.signUp(this.identify, this.userName);
    //     break
    // }
  }
  constructor(private readonly mixpanelService: MixpanelService) {
  }
}
