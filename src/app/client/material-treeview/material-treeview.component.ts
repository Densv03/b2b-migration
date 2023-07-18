import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MaterialTreeviewService} from "./material-treeview.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {B2bNgxCheckboxModule} from "@b2b/ngx-checkbox";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule} from "@angular/common";


export class CategoryItemNode {
  children: CategoryItemNode[] = [];
  item: string = '';
  value: string = '';
}

export class CategoryItemFlatNode {
  item: string = '';
  level: number = 1;
  expandable: boolean = false;
  value: string = '';
}

@Component({
  selector: 'b2b-material-treeview',
  templateUrl: 'material-treeview.component.html',
  styleUrls: ['material-treeview.component.scss'],
  standalone: true,
  providers: [
    MaterialTreeviewService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaterialTreeviewComponent),
      multi: true,
    }],
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    B2bNgxCheckboxModule,
    CommonModule
  ]
})
export class MaterialTreeviewComponent implements ControlValueAccessor {
  @Input() showSaveBtn: boolean;
  @Input() showBtnLabel: string;
  public flatNodeMap = new Map<CategoryItemFlatNode, CategoryItemNode>();

  public nestedNodeMap = new Map<CategoryItemNode, CategoryItemFlatNode>();

  public treeControl: FlatTreeControl<CategoryItemFlatNode>;

  public treeFlattener: MatTreeFlattener<CategoryItemNode, CategoryItemFlatNode>;

  public dataSource: MatTreeFlatDataSource<CategoryItemNode, CategoryItemFlatNode>;

  public checklistSelection = new SelectionModel<CategoryItemFlatNode>(true, []);

  private onChange = (categories: string[]) => {};
  private onTouched = () => {};

  constructor(private readonly _database: MaterialTreeviewService,
              private readonly c: ChangeDetectorRef) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<CategoryItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(categoriesId: string[] | string): void {
    if (Array.isArray(categoriesId)) {
      categoriesId.forEach(categoryId => this.selectParentNodeByCategoryId(categoryId))
    } else if (typeof categoriesId === 'string') {
      this.selectParentNodeByCategoryId(categoriesId)
    }
  }

  public getLevel = (node: CategoryItemFlatNode) => node.level;

  public isExpandable = (node: CategoryItemFlatNode) => node.expandable;

  public getChildren = (node: CategoryItemNode): CategoryItemNode[] => node.children;

  public hasChild = (_: number, _nodeData: CategoryItemFlatNode) => _nodeData.expandable;

  public transformer = (node: CategoryItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item ? existingNode : new CategoryItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    flatNode.value = node.value;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  public descendantsAllSelected(node: CategoryItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => this.checklistSelection.isSelected(child));
    return descAllSelected;
  }

  public categoryItemSelectionToggle(node: CategoryItemFlatNode, e?: Event): void {
    e?.stopPropagation();
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);

    if (!this.showSaveBtn) {
      this.save();
    }
  }

  public categoryLeafItemSelectionToggle(node: CategoryItemFlatNode, e?: Event): void {
    e?.stopPropagation()
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    if (!this.showSaveBtn) {
      this.save();
    }
  }

  public checkAllParentsSelection(node: CategoryItemFlatNode): void {
    let parent: CategoryItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  public checkRootNodeSelection(node: CategoryItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  public getParentNode(node: CategoryItemFlatNode): CategoryItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  public save(): void {
    const selectedValues: string[] = this.checklistSelection.selected.map(selectedItem => selectedItem.value)
    this.onChange(selectedValues)
  }

  private selectParentNodeByCategoryId(categoryId: string): void {
    const foundCategoryFlatNode = this.treeControl.dataNodes.find(dataNode => dataNode.value === categoryId);
    if (this.checklistSelection.isSelected(foundCategoryFlatNode)) {
      return;
    }
    if (foundCategoryFlatNode) {
      if (foundCategoryFlatNode.level === 0) {
        this.categoryItemSelectionToggle(foundCategoryFlatNode)
      } else {
        this.categoryLeafItemSelectionToggle(foundCategoryFlatNode)
      }
    }
  }
}
