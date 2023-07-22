import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ApiService } from "../../../core/services/api/api.service";

@Injectable({
	providedIn: "root",
})
export class WikiService {
	public readonly _articlesBehaviourSubject: BehaviorSubject<any[]>;
	public readonly _articles$: Observable<any>;
	public readonly _endpoint: string;

	constructor(private readonly _apiService: ApiService) {
		this._articlesBehaviourSubject = new BehaviorSubject<any[]>([]);
		this._articles$ = this._articlesBehaviourSubject.asObservable();
		this._endpoint = "posts/";
	}

	public getTags(str: unknown) {
		return this._apiService.get(`tags?q=${str}`);
	}

	public createArticle(body: unknown) {
		return this._apiService.post("post/create", body);
	}

	public getComments(post: string) {
		return this._apiService.get(`comment/${post}`);
	}

	public updateArticle(id: any, body: unknown) {
		return this._apiService.put(`post/${id}/update`, body);
	}

	public createComment(post: any, text: any) {
		return this._apiService.post(`comment/create`, {
			post,
			text,
		});
	}

	public getArticleById(id: string): Observable<any> {
		const articles = this._articlesBehaviourSubject.getValue();
		const foundArticle = articles.find((articleToFind) => articleToFind.id === id);

		if (foundArticle) {
			return of(foundArticle);
		}

		return this._apiService.get(`post/${id}`);
	}

	public getArticles(queryString: any): Observable<any> {
		return this._apiService.get(`posts${queryString}`);
	}

	public deleteArticleById(id: any) {
		return this._apiService.delete(`post/${id}/delete`);
	}
}
