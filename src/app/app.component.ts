import { Component } from '@angular/core';
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-again'
  theme = B2bNgxButtonThemeEnum
}
