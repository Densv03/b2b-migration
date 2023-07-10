import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, map, Observable} from 'rxjs';
import {ApiService} from "../../core/services/api/api.service";
import {GetPaymentPlanResponse} from "../../core/models/admin-billing/responses/get-payment-plan-response.model";
import {first} from "rxjs/operators";
import {AddPaymentPlanBody} from "../../core/models/admin-billing/add-payment-plan-body.model";
import {AddPaymentPlanResponse} from "../../core/models/admin-billing/responses/add-payment-plan-response.model";
import {UpdatePaymentPlanResponse} from "../../core/models/admin-billing/responses/update-payment-plan-response.model";
import {HttpEvent} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminBillingService {
  constructor(private apiService: ApiService) {}

  private currentPaymentPlans: BehaviorSubject<GetPaymentPlanResponse[]> = new BehaviorSubject<
    GetPaymentPlanResponse[]
  >([]);

  public getCurrentPaymentPlans(): Observable<GetPaymentPlanResponse[]> {
    return this.currentPaymentPlans.asObservable();
  }

  public updateCurrentPaymentPlans(type?: "quotes" | "subscriptions"): void {
    const queryString = type ? `?type=${type}` : "";
    this.apiService
      .get<GetPaymentPlanResponse[]>(`authorize-net/get-payment-plan${queryString}`)
      .pipe(
        filter((data) => !!data),
        first()
      )
      .subscribe((data) => this.currentPaymentPlans.next(data));
  }

  public addPaymentPlan(data: AddPaymentPlanBody): Observable<HttpEvent<AddPaymentPlanResponse>> {
    return this.apiService.post<AddPaymentPlanResponse>("authorize-net/add-new-payment-plan", data);
  }

  public updatePaymentPlanById(id: string, data: Partial<AddPaymentPlanBody>): Observable<UpdatePaymentPlanResponse> {
    return this.apiService.put<UpdatePaymentPlanResponse>("authorize-net/update-payment-plan", { id, ...data });
  }

  public deletePaymentPlanById(id: string): Observable<any> {
    return this.apiService.delete(`authorize-net/delete-payment-plan`, { body: { id } });
  }

  public getPaymentPlans(type?: "quotes" | "subscriptions"): Observable<GetPaymentPlanResponse[]> {
    const queryString = type ? `?type=${type}` : "";
    return this.apiService.get<GetPaymentPlanResponse[]>(`authorize-net/get-payment-plan${queryString}`);
  }

  public getQuotesPaymentPlansToDisplay(): Observable<GetPaymentPlanResponse[]> {
    return this.apiService.get<GetPaymentPlanResponse[]>(`authorize-net/get-payment-plan?type=quotes`).pipe(
      map((data) => {
        if (data.length > 3) {
          return data.slice(0, 3);
        }

        return data;
      })
    );
  }
}
