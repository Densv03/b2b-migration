import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminManagerRoutingModule } from "./admin-manager-routing.module";
import { AdminManagerComponent } from "./layout/admin-manager.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { MatTableModule } from "@angular/material/table";
import {B2bNgxIconModule} from "@b2b/ngx-icon";

@NgModule({
	declarations: [AdminManagerComponent],
    imports: [
        CommonModule,
        AdminManagerRoutingModule,
        B2bNgxInputModule,
        ReactiveFormsModule,
        B2bNgxButtonModule,
        FormsModule,
        B2bNgxInputModule,
        MatTableModule,
        B2bNgxIconModule,
    ],
})
export class AdminManagerModule {}
