import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'b2b-breadcrumps',
  templateUrl: './b2b-breadcrumps.component.html',
  styleUrls: ['./b2b-breadcrumps.component.scss']
})
export class B2bBreadcrumpsComponent implements OnInit {

  public breadcrumbs: any;
	constructor(private router: Router, private route: ActivatedRoute) { }
	ngOnInit() {
		this.route.data.subscribe((data: any) => {
			this.breadcrumbs =	this.router.getCurrentNavigation()?.extras.state?.['breadcrumbs'] ?
				this.router.getCurrentNavigation().extras.state?.['breadcrumbs'] : data?.breadcrumbs;
			console.log(this.breadcrumbs);
		});
	}
}
