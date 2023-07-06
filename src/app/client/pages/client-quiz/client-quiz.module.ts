import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientQuizRoutingModule } from "./client-quiz-routing.module";
import { ClientQuizComponent } from "./layout/client-quiz.component";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientQuizComponent],
	imports: [CommonModule, ClientQuizRoutingModule, TranslocoModule],
})
export class ClientQuizModule {}
