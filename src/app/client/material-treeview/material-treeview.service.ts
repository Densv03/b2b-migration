import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {CategoryItemNode} from "./material-treeview.component";
import {MOCK_CATEGORIES_DATA} from "../../categories-mock";

@Injectable()
export class MaterialTreeviewService {
  public dataChange: BehaviorSubject<CategoryItemNode[]> = new BehaviorSubject<CategoryItemNode[]>([]);

  get data(): CategoryItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  public initialize() {
    const data = this.buildFileTreeFromArray(MOCK_CATEGORIES_DATA, 0);

    this.dataChange.next(data);
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
