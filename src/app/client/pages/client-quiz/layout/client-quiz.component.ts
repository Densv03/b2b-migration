import { DOCUMENT } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject, Renderer2 } from "@angular/core";

@Component({
	selector: "b2b-client-quiz",
	templateUrl: "./client-quiz.component.html",
	styleUrls: ["./client-quiz.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientQuizComponent {
	constructor(private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document) {}

	public ngOnInit() {
		const script = this._renderer2.createElement("script");
		script.text = `
    (function(w, d, s, o){
      var j = d.createElement(s); j.async = true; j.src = '//script.marquiz.ru/v2.js';j.onload = function() {
        if (document.readyState !== 'loading') Marquiz.init(o);
        else document.addEventListener("DOMContentLoaded", function() {
          Marquiz.init(o);
        });
      };
      d.head.insertBefore(j, d.head.firstElementChild);
    })(window, document, 'script', {
        host: '//quiz.marquiz.ru',
        region: 'eu',
        id: '6205090813f52f003f08d773',
        autoOpen: 0,
        autoOpenFreq: 'once',
        openOnExit: false,
        disableOnMobile: false
      }
    );
        `;

		this._renderer2.appendChild(this._document.body, script);
	}
}
