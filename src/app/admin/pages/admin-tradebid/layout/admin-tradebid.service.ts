import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { HotToastService } from "@ngneat/hot-toast";
import { ApiService } from "../../../../core/services/api/api.service";
import { OffersQuery } from "../../../../client/state/offers/offers.query";
import { OffersStore } from "../../../../client/state/offers/offers.store";

function getPreviewPhoto(offer: { photos: string | any[]; }) {
	return offer.photos && offer.photos.length ? offer.photos[0].lg : null;
}

@UntilDestroy()
@Injectable({
	providedIn: "root",
})
export class AdminTradeBidService {
	public readonly _endpoint: string;
	constructor(
		private readonly _apiService: ApiService,
		private readonly _offersQuery: OffersQuery,
		private readonly _offersStore: OffersStore,
		private readonly _hotToastService: HotToastService
	) {
		this._endpoint = "offers/";
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
				.pipe(untilDestroyed(this))
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
				untilDestroyed(this),
				this._hotToastService.observe({
					loading: "Offer status updating...",
					success: "Offer status updated successfully!",
					error: "Offer status updating failed!",
				})
			)
			.subscribe();
	}

	// public hideOffer(id: string) {
	// 	return this._apiService.post(`offer/${id}/hide`, {}).pipe(untilDestroyed(this));
	// }
	//
	// public unHideOffer(id: string) {
	// 	return this._apiService.post(`offer/${id}/unHide`, {}).pipe(untilDestroyed(this));
	// }
	//
	// public adminHideOffer(id: string) {
	// 	return this._apiService.post(`offer/${id}/adminHide`, {}).pipe(untilDestroyed(this));
	// }
	//
	// public adminUnHideOffer(id: string) {
	// 	return this._apiService.post(`offer/${id}/adminUnHide`, {}).pipe(untilDestroyed(this));
	// }

	public deleteOfferSub(id: string) {
		return this._apiService.delete(`offer/${id}/delete`).pipe(untilDestroyed(this));
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
			.get("my/offers/")
			.pipe(untilDestroyed(this))
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
		return this._apiService.get("tradeBid/get-rfq-admin" + queryString + "&hideCompleted=true").pipe(
			untilDestroyed(this),
			map((response: any) => {
				const { rfqList, totalCount } = response;
				const allOffers = rfqList.map((offer: { photos: string | any[]; }) => {
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
			untilDestroyed(this),
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
		this._apiService.get(url).subscribe((savedOffers: any) => {
			this._offersStore.update({
				savedOffers: savedOffers.map((savedOffer: any) => ({
					...savedOffer,
					previewPhoto: getPreviewPhoto(savedOffer),
				})),
			});
		});
		return this._offersQuery.selectSavedOffers$;
	}

	public createOffer(offerToCreate: unknown) {
		return this._apiService.post("offer/create", offerToCreate);
	}

	public updateOffer(offerToUpdate: unknown, id: any) {
		return this._apiService.put(`offer/${id}/update`, offerToUpdate);
	}

	public addFavoriteOffer(id: string) {
		return this._apiService.post(`user/favourites/${id}/add`, {}).pipe(
			tap(() => {
				this._offersStore.update({
					allOffers: this._offersStore.getValue().allOffers.map((offer: { _id: string; isSaved: any; }) => ({
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
					savedOffers: savedOffers.filter((savedOffer: { _id: string; }) => savedOffer._id !== id),
					allOffers: allOffers.map((offer: { _id: string; isSaved: any; }) => ({
						...offer,
						isSaved: offer._id === id ? false : offer.isSaved,
					})),
				});
			})
		);
	}

	public approveOffer(id: string) {
		return this._apiService.post(`tradeBid/rfq-approval`, { id });
	}

	public declineOffer(id: string, message: string) {
		return this._apiService.post(`tradebid/rfq-rejection`, { id: id, reasonForReject: message });
	}
}
