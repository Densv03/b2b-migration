import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";

import { CoreModule} from "./core/core.module";
import {AppComponent} from "./app.component";

@NgModule({
  imports: [CoreModule, ServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
