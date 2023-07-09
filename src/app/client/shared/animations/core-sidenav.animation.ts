import { animate, group, state, style, transition, trigger } from "@angular/animations";

export const CoreSidenavAnimation = [
	trigger("slideInOut", [
		state(
			"in",
			style({
				visibility: "visible",
			})
		),
		state(
			"out",
			style({
				right: "-100vw",
				visibility: "hidden",
			})
		),
		transition("in => out", [
			group([
				animate(
					"700ms ease-in-out",
					style({
						right: "-100vw",
						display: "none",
					})
				),
			]),
		]),
		transition("out => in", [
			group([
				animate(
					"1ms ease-in-out",
					style({
						visibility: "visible",
					})
				),
				animate(
					"400ms ease-in-out",
					style({
						right: "0px",
					})
				),
			]),
		]),
	]),
];
