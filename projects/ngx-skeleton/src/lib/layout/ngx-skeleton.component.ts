import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {NgxSkeletonLoaderConfig} from "ngx-skeleton-loader/lib/ngx-skeleton-loader-config.types";

@Component({
	selector: "b2b-ngx-skeleton",
	templateUrl: "./ngx-skeleton.component.html",
	styleUrls: ["./ngx-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxSkeletonComponent {
	@Input() public option: Partial<NgxSkeletonLoaderConfig>;
}
