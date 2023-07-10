import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MOCK_CATEGORIES_DATA } from './categories-mock';
import { FormControl, FormGroup } from '@angular/forms';
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";

interface ParentCategory {
  children: ChildCategory[];
  icon: string;
  image: string;
  name: string;
  path: string;
  productsCount: number;
  _id: string;
}
interface ChildCategory {
  children: ChildCategory[];
  name: string;
  path: string;
  productsCount: number;
  sort: number;
  _id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public theme = B2bNgxInputThemeEnum
  public treeControl = new NestedTreeControl<ParentCategory | ChildCategory>(
    (node) => node.children
  );
  public dataSource = new MatTreeNestedDataSource<
    ChildCategory | ParentCategory
  >();
  public form: FormGroup = new FormGroup({ categories: new FormControl('') });
  private readonly CATEGORIES_MOCK: ParentCategory[] = MOCK_CATEGORIES_DATA;

  constructor() {
    this.dataSource.data = this.addCheckedField(this.CATEGORIES_MOCK);
  }

  ngOnInit(): void {
    this.form
      .get('categories')
      ?.setValue([
        '60a784830a04b16c574e823e',
        '60a784830a04b16c574e8246',
        '60a784830a04b16c574e826d',
        '60a784830a04b16c574e8267',
        '60a784830a04b16c574e825e',
        '60a784830a04b16c574e8249',
        '61ee4bfca0e63583b45822b5',
        '624d710bd5a00e47604996e4',
        '624d7131d5a00e4760499705',
      ]);
    this.form
      .get('categories')
      ?.valueChanges.subscribe((data) => console.log('value changes', data));
  }

  public hasChild = (_: number, node: ParentCategory | ChildCategory) =>
    !!node.children && node.children.length > 0;

  public toggleAll(node: ParentCategory, e: Event): void {
    e.stopPropagation();
  }

  private addCheckedField(data: ParentCategory[]) {
    return data.map((item) => {
      if (item.children.length) {
        item.children = item.children.map((child) => ({
          ...child,
          checked: false,
        }));
      }
      return { ...item, checked: false };
    });
  }
}
