import { NgModule } from "@angular/core";
import { InvoicesComponent } from "./layuot/invoices.component";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [InvoicesComponent],
	exports: [InvoicesComponent],
	imports: [CommonModule],
})
export class InvoicesModule {}
