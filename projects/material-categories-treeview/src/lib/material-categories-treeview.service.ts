import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, first} from "rxjs";
import {CategoryItemNode} from "./material-categories-treeview.component";
import {MOCK_CATEGORIES_DATA} from "../../../../src/app/categories-mock";
import {CategoriesService} from "../../../../src/app/client/services/categories/categories.service";

@Injectable({
  providedIn: 'root'
})
export class MaterialCategoriesTreeviewService {
  public dataChange: BehaviorSubject<CategoryItemNode[]> = new BehaviorSubject<CategoryItemNode[]>([]);

  get data(): CategoryItemNode[] {
    return this.dataChange.value;
  }

  constructor(private readonly categoriesService: CategoriesService) {
    this.initialize();
  }

  public initialize() {
    this.categoriesService.getCategories().pipe(filter(data => data.categories), first()).subscribe(categories => {
      const data = this.buildFileTreeFromArray(MOCK_CATEGORIES_DATA, 0);
      this.dataChange.next(data);

    })
  }

  public buildFileTreeFromArray(arr: any[], level: number): any[] {
    return arr.reduce((acc, val) => {
      const node = new CategoryItemNode();
      node.item = val.name;
      node.value = val._id;

      if (val) {
        if (Array.isArray(val?.children)) {
          node.children = this.buildFileTreeFromArray(val.children, level + 1);
        } else {
          node.item = val;
        }
      }

      return acc.concat(node)
    }, []);
  }
}
