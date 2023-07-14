import { animate, group, state, style, transition, trigger } from "@angular/animations";

export const SlideInOutAnimation = [
	trigger("slideInOut", [
		state(
			"in",
			style({
				bottom: "0px",
				visibility: "visible",
			})
		),
		state(
			"out",
			style({
				bottom: "-100vh",
				visibility: "hidden",
			})
		),
		transition("in => out", [
			group([
				animate(
					"700ms ease-in-out",
					style({
						bottom: "-100vh",
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
						bottom: "0px",
					})
				),
			]),
		]),
	]),
];
