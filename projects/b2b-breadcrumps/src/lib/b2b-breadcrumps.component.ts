import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'b2b-breadcrumps',
  templateUrl: './b2b-breadcrumps.component.html',
  styleUrls: ['./b2b-breadcrumps.component.scss']
})
export class B2bBreadcrumpsComponent implements OnInit {

	public breadcrumbs: { label: string, url: string }[];

	constructor(private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.breadcrumbs = data?.['breadcrumbs'];

			if (this.route.snapshot.params?.['id']) {
				this.breadcrumbs.push({
					label: this.route.snapshot.params['id'],
					url: this.router.url
				})
			}
		});
	}
}
