import { Injectable } from "@angular/core";
import { first, map, tap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiService } from "../../../core/services/api/api.service";
import { OffersQuery } from "../../state/offers/offers.query";
import { OffersStore } from "../../state/offers/offers.store";

function getPreviewPhoto(offer: any) {
	return offer.photos && offer.photos.length ? offer.photos[0].lg : null;
}

// @UntilDestroy()
@Injectable({
	providedIn: "root",
})
export class OffersService {
	public readonly _endpoint: string;

	private offersSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	private savedOffersSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	private offersLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	private savedOffersLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	constructor(
		private readonly _apiService: ApiService,
		private readonly _offersQuery: OffersQuery,
		private readonly _offersStore: OffersStore,
	) {
		this._endpoint = "offers/";
	}

	get offers$(): Observable<any> {
		return this.offersSource.asObservable();
	}
	get savedOffers$(): Observable<any> {
		return this.savedOffersSource.asObservable();
	}

	get offersLength$(): Observable<any> {
		return this.offersLength.asObservable();
	}

	get savedOffersLength$(): Observable<any> {
		return this.savedOffersLength.asObservable();
	}

	public removeAllOffers() {
		return this._apiService.delete("offers/delete");
	}

	public getContainerLocation(query: any) {
		return this._apiService.get(`container/location?${query}`);
	}

	public getAllOffersCount() {
		return this._offersQuery.selectAllOffersCount$;
	}

	public getSeaLines() {
		const { seaLines } = this._offersQuery.getValue();

		if (!seaLines.length) {
			this._apiService
				.get("seaLines")
				// .pipe(untilDestroyed(this))
				.subscribe((response) => {
					this._offersStore.update({
						seaLines: response,
					});
				});
		}

		return this._offersQuery.selectSeaLines$;
	}

	public markAsSold(id: string) {
		this._apiService
			.post(`offer/${id}/status/update`, { status: "sold" })
			.pipe(
				// untilDestroyed(this),
				// this._hotToastService.observe({
				// 	loading: "Offer status updating...",
				// 	success: "Offer status updated successfully!",
				// 	error: "Offer status updating failed!",
				// })
			)
			.subscribe();
	}

	public hideOffer(id: string) {
		return this._apiService.post(`offer/${id}/hide`, {});
	}

	public unHideOffer(id: string) {
		return this._apiService.post(`offer/${id}/unHide`, {});
	}

	public adminHideOffer(id: string) {
		return this._apiService.post(`offer/${id}/adminHide`, {});
	}

	public adminUnHideOffer(id: string) {
		return this._apiService.post(`offer/${id}/adminUnHide`, {});
	}

	public deleteOfferSub(id: string) {
		return this._apiService.delete(`offer/${id}/delete`);
	}
	public deleteRfq(id: string) {
		return this._apiService.delete(`tradeBid/delete-rfq-admin`, { body: { rfqId: id } });
	}
	public deleteOfferById(id: string, body: any) {
		return this._apiService.delete(`offer/${id}/delete`, body);
		// .pipe(untilDestroyed(this))
		// .subscribe(() => {
		// 	this._offersStore.update({
		// 		myOffers: this._offersQuery.getValue().myOffers.filter((myOffer) => myOffer._id !== id),
		// 	});
		// });
	}

	public getOfferById(id: string): Observable<any> {
		return this._apiService.get(`offer/${id}/`).pipe(
			tap((response) => {
				this._offersStore.update({
					offer: response,
				});
			})
		);
	}

	public getMyOffers(): Observable<any> {
		this._apiService
			.get("my/offers?limit=1")
			.subscribe((myOffers: any) => {
				this._offersStore.update({
					myOffers: myOffers.map((myOffer: any) => ({
						...myOffer,
						previewPhoto: getPreviewPhoto(myOffer),
					})),
				});
			});

		return this._offersQuery.selectMyOffers$;
	}

	public getOffers(queryString: string = ""): Observable<any> {
		return this._apiService.get("offers/" + queryString).pipe(
			// untilDestroyed(this),
			map((response: any) => {
				const { offers, totalCount } = response;

				const allOffers = offers.map((offer: any) => {
					return {
						...offer,
						previewPhoto: getPreviewPhoto(offer),
					};
				});
				this._offersStore.update({
					allOffers,
					allOffersCount: totalCount,
				});

				return [...allOffers];
			})
		);
	}

	public getActiveOffers(): Observable<any> {
		return this._apiService.get("offers?hideSold=true").pipe(
			// untilDestroyed(this),
			map((response: any) => {
				const { offers, totalCount } = response;

				const allOffers = offers.map((offer: any) => {
					return {
						...offer,
						previewPhoto: getPreviewPhoto(offer),
					};
				});
				this._offersStore.update({
					allOffers,
					allOffersCount: totalCount,
				});

				return [...allOffers];
			})
		);
	}

	public getSavedOffers(): Observable<any> {
		const url = "my/offers/favourites";
		this._apiService.get<any[]>(url).subscribe((savedOffers: any[]) => {
			this._offersStore.update({
				savedOffers: savedOffers.map((savedOffer) => ({
					...savedOffer,
					previewPhoto: getPreviewPhoto(savedOffer),
				})),
			});
		});
		return this._offersQuery.selectSavedOffers$;
	}

	public createOffer(offerToCreate: any) {
		return this._apiService.post("offer/create", offerToCreate);
	}

	public updateOffer(offerToUpdate: any, id: any) {
		return this._apiService.put(`offer/${id}/update`, offerToUpdate);
	}

	public addFavoriteOffer(id: string) {
		return this._apiService.post(`user/favourites/${id}/add`, {}).pipe(
			tap(() => {
				this._offersStore.update({
					allOffers: this._offersStore.getValue().allOffers.map((offer: any) => ({
						...offer,
						isSaved: offer._id === id ? true : offer.isSaved,
					})),
				});
			})
		);
	}

	public removeFavoriteOffer(id: string) {
		return this._apiService.delete(`user/favourites/${id}/remove`).pipe(
			tap(() => {
				const { savedOffers, allOffers } = this._offersQuery.getValue();

				this._offersStore.update({
					savedOffers: savedOffers.filter((savedOffer: any) => savedOffer._id !== id),
					allOffers: allOffers.map((offer: any) => ({
						...offer,
						isSaved: offer._id === id ? false : offer.isSaved,
					})),
				});
			})
		);
	}

	public approveOffer(id: string) {
		return this._apiService.post(`offer/${id}/adminApprovalOffer`, {});
	}

	public declineOffer(id: string) {
		return this._apiService.post(`offer/${id}/adminRejectionOffer`, {});
	}
	public updateOffersList(queryString: string): void {
		this.getOffers(queryString)
			.pipe(first())
			.subscribe((data) => {
				this.offersSource.next(data.rfqList);
				// this.rfqManageLength.next(data.totalCount);
			});
	}
}
