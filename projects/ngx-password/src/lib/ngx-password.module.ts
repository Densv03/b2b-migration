import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxPasswordComponent } from './ngx-password.component';
import {B2bNgxInputModule} from "@b2b/ngx-input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {B2bNgxIconModule} from "@b2b/ngx-icon";

@NgModule({
    imports: [CommonModule, B2bNgxInputModule, ReactiveFormsModule, MatFormFieldModule, B2bNgxIconModule],
    declarations: [
        NgxPasswordComponent
    ],
    exports: [
        NgxPasswordComponent
    ]
})
export class NgxPasswordModule {}
