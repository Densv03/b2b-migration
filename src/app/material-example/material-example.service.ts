import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CategoryItemNode} from "./material-example.component";
import {MOCK_CATEGORIES_DATA} from "../categories-mock";

@Injectable()
export class MaterialExampleService {
  dataChange = new BehaviorSubject<CategoryItemNode[]>([]);

  get data(): CategoryItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    const data = this.buildFileTreeFromArray(MOCK_CATEGORIES_DATA, 0);

    this.dataChange.next(data);
  }

  // buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
  //   return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
  //     const value = obj[key];
  //     const node = new TodoItemNode();
  //     node.item = key;
  //
  //     if (value != null) {
  //       if (typeof value === 'object') {
  //         node.children = this.buildFileTree(value, level + 1);
  //       } else {
  //         node.item = value;
  //       }
  //     }
  //
  //     return accumulator.concat(node);
  //   }, []);
  // }

  buildFileTreeFromArray(arr: any[], level: number): any[] {
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
