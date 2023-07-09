import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../../../../core/services/api/api.service";

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private apiService: ApiService) { }

	public getCarouselItems(): Observable<any[]> {
		return this.apiService.get('cache/first-screen-carousel');
	}

	public updateCarouselItems(data: any): Observable<any> {
		return this.apiService.post('product/update-first-screen-carousel', data);
	}

	// public updateSubscription(model: {	categoriesId: string[],
	// 	email:string}): Observable<{message: string }> {
	// 	return this.apiService.post('subscription/update-user-subscription', model);
	// }
}
