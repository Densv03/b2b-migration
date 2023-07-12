import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxImagesCarouselComponent } from "./layout/ngx-images-carousel.component";
import { GalleryModule } from "ng-gallery";

@NgModule({
	imports: [CommonModule, GalleryModule],
	declarations: [B2bNgxImagesCarouselComponent],
	exports: [B2bNgxImagesCarouselComponent],
})
export class B2bNgxImagesCarouselModule {}
