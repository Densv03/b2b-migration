import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxSkeletonComponent } from "./layout/ngx-skeleton.component";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

@NgModule({
	imports: [CommonModule, NgxSkeletonLoaderModule],
	declarations: [B2bNgxSkeletonComponent],
	exports: [B2bNgxSkeletonComponent],
})
export class B2bNgxSkeletonModule {}
