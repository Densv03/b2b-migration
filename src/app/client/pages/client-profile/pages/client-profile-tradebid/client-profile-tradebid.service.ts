import { Injectable } from "@angular/core";
import { ApiService } from "../../../../../core/services/api/api.service";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, first } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class ClientProfileTradebidService {
	private rfqChatsSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	private quotationChatsSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	private rfqManageSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	private rfqArchivedSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	private quotationChatsLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	private rfqChatsLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	private rfqManageLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	private rfqArchivedLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	constructor(private apiService: ApiService) {}

	get myQuotationChats$(): Observable<any> {
		return this.quotationChatsSource.asObservable();
	}
	get myRfqChats$(): Observable<any> {
		return this.rfqChatsSource.asObservable();
	}
	get myRfqManage$(): Observable<any> {
		return this.rfqManageSource.asObservable();
	}
	get myRfqArchived$(): Observable<any> {
		return this.rfqArchivedSource.asObservable();
	}

	get quotationChatsLength$(): Observable<any> {
		return this.quotationChatsLength.asObservable();
	}
	get rfqChatsLength$(): Observable<any> {
		return this.rfqChatsLength.asObservable();
	}
	get manageListLength$(): Observable<any> {
		return this.rfqManageLength.asObservable();
	}
	get archivedListLength$(): Observable<any> {
		return this.rfqArchivedLength.asObservable();
	}

	public getRfqChats(typeRoom: "rfq" | "quotation", queryString: string): Observable<any> {
		return this.apiService.get(`my/chats?typeRoom=${typeRoom}${queryString}`);
	}
	public getRfqManage(queryString: string): Observable<any> {
		return this.apiService.get(`tradeBid/get-user-rfq${queryString}`);
	}
	public getRfqArchived(queryString: string): Observable<any> {
		return this.apiService.get(`tradeBid/get-user-archive-rfq${queryString}`);
	}

	public updateRfqManageList(queryString: string): void {
		this.getRfqManage(queryString)
			.pipe(first())
			.subscribe((data) => {
				this.rfqManageSource.next(data.rfqList);
				this.rfqManageLength.next(data.totalCount);
			});
	}

	public updateRfqArchivedList(queryString: string): void {
		this.getRfqArchived(queryString)
			.pipe(first())
			.subscribe((data) => {
				this.rfqArchivedSource.next(data.rfqList);
				this.rfqArchivedLength.next(data.totalCount);
			});
	}

	public updateRfqChatsList(queryString: string = "&limit=7&"): void {
		this.getRfqChats("rfq", queryString)
			.pipe(first())
			.subscribe((data) => {
				this.rfqChatsSource.next(data.chats);
				this.rfqChatsLength.next(data.totalCount);
			});
	}

	public updateQuotationChatsList(queryString: string = "&limit=7&"): void {
		this.getRfqChats("quotation", queryString)
			.pipe(first())
			.subscribe((data) => {
				this.quotationChatsSource.next(data.chats);
				this.quotationChatsLength.next(data.totalCount);
			});
	}

	public archivateItem(id: any): Observable<any> {
		return this.apiService.post(`tradeBid/archive-rfq`, { rfqId: id });
	}
	public activateItem(id: any): Observable<any> {
		return this.apiService.post(`tradebid/activate-rfq`, { rfqId: id });
	}
	public deleteItem(id: any): Observable<any> {
		return this.apiService.delete(`tradebid/delete-rfq`, { body: { rfqId: id } });
	}
	public editItem(body: any): Observable<any> {
		return this.apiService.patch(`tradebid/update-user-rfq`, body);
	}

	public getRfqById(RfqId: string): Observable<any> {
		return this.apiService.get<any>(`tradeBid/quotation/${RfqId}`).pipe(filter((data) => !!data));
	}
}
