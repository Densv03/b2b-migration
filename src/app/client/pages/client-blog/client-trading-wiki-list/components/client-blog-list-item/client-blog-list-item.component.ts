import {Component, Input, OnInit} from '@angular/core';
import {B2bNgxLinkService, B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";

@Component({
  selector: 'b2b-client-blog-list-item',
  templateUrl: './client-blog-list-item.component.html',
  styleUrls: ['./client-blog-list-item.component.scss']
})
export class ClientBlogListItemComponent {
	@Input() articleItem: any;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

  constructor() {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	}


}
